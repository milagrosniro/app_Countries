const express = require('express')
const {Country} = require('../models/Country')
const { Router } = require('express');
const {Activity} = require('../models/Activity');
const {db} = require('../db')

// GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

const router = Router()

// GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
router.get('/:idPais', (req,res)=>{
    res.send("HOLAAA")
})
// router.get('/countries/:idPais', async (req,res)=>{
//     const {idPais} = req.params;

//     if(!idPais){
//         res.json({msg: "Debes agregar el id del Pais que deseas buscar"})
//     }

//     let country;
//     try{
//         country = await Country.findByPk(idPais, {
//             include: Activity
//         })

//         country = {
//             id: country.id,
//             name:country.name,
//             flag:country.flag,
//             region:country.region,
//             capital:country.capital,
//             subregion:country.subregion,
//             area:country.area,
//             population:country.population,
//             activities: country.Activity.map(activity =>{
//           return{
//               name:activity.name,
//               dificulty: activity.dificulty,
//               duration: activity.duration,
//               season: activity.season
//           }
//       })
//         }
//         return res.json(country)

//     }catch(error){
//         res.json(error)
//     }
// } )

// // GET /countries?name="...":
// // Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// // Si no existe ningún país mostrar un mensaje adecuado

// router.get('/countries',async (req, res) =>{
//     const {name} = req.query
//     if(name){
//         try{
//             const country = await Country.findAll({
//                 where: {name : {[Op.like]: `%${name}%`}}
//             })
//                 return res.json(country);
//         }
//         catch(error){
//             console.log(error)
//         }
//     }
//     return res.json({msg: "No se ha encontrado este Pais"})
//     });


//mostrar todos los paises 
router.get('/', db, async (req, res) => {
    try {
        const countries = await Country.findAll()
        //console.log(countries);
        res.json(countries)
    } catch (error) {
        res.status(404).json({msg: 'No se han encontrado paises en la base de datos'})
    }
})

module.exports = router;