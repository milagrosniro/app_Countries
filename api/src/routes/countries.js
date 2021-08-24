
const { Router } = require('express');
const { Country, Activity, Activity_Country } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();

//Precargado de datos
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
            return next();
        }
    } catch (err) {
        next(err)
    }
}


router.get("/", dataBase, async(req, res, next) => { //todos los paies //paises por nombre
    const { name } = req.query;
    try {
        if(name) { //Si me pasan un nombre por Query, lo busco en la DB
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



router.get('/:id', dataBase, async (req, res, next) => {
    let { id } = req.params;
    id = id.toLocaleUpperCase() //transformo lo que recibo por params en mayuscula para no tener problema con la bsuqueda
   
    let activitiesId=[]
    let detailActivities= []
    let countryActiv= {}
    try {
        let country = await Country.findByPk(id, { //detalle pais
            include: { model: Activity} })
           // console.log("COUNTRY",country)
       
            let activities = await Activity_Country.findAll({where:{countryId: id}})  //traer datos de ACtivity_Country trae id de paisess y activ con id de params

       // console.log("ACTIVITYCOUNTRIE",activities)
        
            for(let i=0; i <activities.length; i++){
                activitiesId.push(activities[i].dataValues.activityId)   
            }

            // console.log("ACTIVITIESID", activitiesId)

            for(let i=0; i<activitiesId.length; i++){
                const find= await Activity.findByPk(activitiesId[i])
                detailActivities.push(find.dataValues)
            }

           // console.log("detailACtivity", detailActivities)
            countryActiv= await {...country.dataValues, activities: detailActivities}      
            return res.json(countryActiv)
        
    } catch (err) {
        next(err)
    }
})

module.exports = router;