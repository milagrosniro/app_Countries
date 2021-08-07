
const { Router } = require('express');
const { Country, Activity } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();


async function dataBase(req, res, next) {
    try {
        const allCountries = await Country.findAll(); //busco los paises en la DB

        //si no hay nada
        if (!allCountries.length) {
            //hago la peticion a la API, recorro todo lo q me trae y voy creando paises con las condiciones requeridas
            let countriesDB = await axios.get('https://restcountries.eu/rest/v2/all');
            countriesDB = countriesDB.data.map(c => {
                return Country.create(

                    {
                        id: c.alpha3Code,
                        name: c.name,
                        flag: c.flag,
                        region: c.region,
                        capital: c.capital,
                        subregion: c.subregion,
                        area: c.area,
                        population: c.population
                    })
            })
            //una vez que se cumplieron todas las prmesas de la DB
            //que continue
            Promise.all(countriesDB)
                .then(response => next())
        } else { //si ya estan los datos en la DB que continue
            return next()
        }
    } catch (err) {
        next(err)
    }
}


// GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.
// // GET /countries?name="...":
// // Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// // Si no existe ningún país mostrar un mensaje adecuado

//mostrar todos los paises 


router.get("/", dataBase, async(req, res, next) => {
    const { name } = req.query;
    try {
        if(name) { //Si me pasan un nombre por Query
            const countries = await Country.findAll({
                attributes: ["id", "name", "flag", "capital","region", "population"],
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` //para evitar problemas con mauscula y minuscula, no distingue de estos
                    }
                },
                include: Activity
            }) //Si este pais existe
            if(countries.length) {
                return res.json(countries)
            } else {
                return res.send("Pais no encontrado")
            }
        } else { //Si no me pasan nombre por Query
            const allCountries = await Country.findAll({
                attributes: ["id", "name", "flag", "region", "population"],
                include: Activity
            });
            return res.send(allCountries)
        }
    } catch (err) {
        return next(err)
    }
})

// router.get('/', async (req, res,next) => {
//     const {name, page, order} = req.query
// //si recibo name por params

//      if (name){
//         //console.log("HAY PARAMS")
//         try{
//             //busco todos los que contengan lo enviado por params
//             const country = await Country.findAll({        
//                  where: {
//                     name:{ //iLike no reconoce mayuscula de minuscula
//                         [Op.iLike]: `%${name}%`
//                     }
//                 }, 
//                 include: {model: Activity} //incluir la tabla de ACtivity, (para poder hacer las relaciones dsp)
//             })
//             console.log(country)
//             return res.json(country)
//            // return res.json(countryByName);
//         }catch(error){
//            next(error)
//         }
//         //EL FILTRADO LO HAGO EN EL FRONT
// // } else if(filter){
// // try{
// //     let countryFilter = await Country.findAll({
// //         where: {
// //             region: filter //ej pa filtrar por region en back
// //         }, 
// //         include: {model: Activity}
// //     })
// //     return res.json(countryFilter)

// // }catch(error){
// //    next(error)
// // }
// }else{
//     //SI NO TENGO FILTRO NI NOMBRE
//     //que devuelva todos los paises que etsan guardados en ls DB
//     try {
//         const allCountries = await Country.findAll(
//         //     {
//         //      EJ PAGINADO BACK
//         //     limit: 9,
//         //     offset: page, //desde q campo queiro q empiece a contar
//         //     order: [[req.query.prop, order]], //order de q manera queiro q ordene ASC o DESC
//         //     include: {model: Activity}
//         // }
//        )

//        return res.json(allCountries)
//     } catch (error) {
//         next(error)

//     }
// }
// })


// // GET /countries/{idPais}:
// // Obtener el detalle de un país en particular
// // Debe traer solo los datos pedidos en la ruta de detalle de país
// // Incluir los datos de las actividades turísticas correspondientes

router.get('/:id', dataBase, async (req, res, next) => {
    let { id } = req.params;
    id = id.toLocaleUpperCase() //transformo lo que recibo por params en mayuscula para no tener problema con la bsuqueda

    try {
        let country = await Country.findByPk(id, {
            include: { model: Activity} })
        if(country){
            return res.json(country)
        }else{
            return res.send("No se encontro el pais")
        }
    } catch (err) {
        next(err)
    }
})


// router.get('/:idPais', async (req,res, next)=>{
//      const {idPais} = req.params;

//     try{
//        let country = await Country.findByPk(idPais, {
//             include: {
//                 model: Activity,       
//             }
//         })
//         return res.json(country)

//    }catch(error){
//        next(error)
//     }

// } )


module.exports = router;