
const { Country, Activity } = require('../db.js');
const { Router } = require('express');


const router = Router()
// [ ] POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos


router.get("/", async (req, res, next) => {
    try {
        const activities = await Activity.findAll({
            include: Country
        });
        return res.json(activities)
    } catch (err) {
        return next(err);
    }
})


router.post('/',async(req,res,next)=>{

    const{name,dificulty,duration,season,idCountry}=req.body;

    try{
        const postActivity = await Activity.create({
            name: name,
            dificulty: dificulty,
            duration: duration,
            season: season
        })

        if(!Array.isArray(idCountry)){
            const country = await Country.findByPk(idCountry);
            await postActivity.addCountry(country)
           // return res.send (`${postActivity.name} fue posteada y relacionada con ${idCountry}`)
            return res.send(postActivity)
        }else{

            idCountry.forEach(async(cId)=>{
                const country = await Country.findByPk(cId);
                await postActivity.addCountry(country)
                
            })
           // return res.send (`${postActivity.name} fue posteada y relacionada con ${idCountry}`)
           return res.send(postActivity)
        }
    }catch(error){
        next(error)
    }
})


//OBTENER TODAS LAS ACTIVIDADES
router.get('/', async(req,res,next)=>{
    try{
        const activities = await Activity.findAll({
            include: {model: Country}
        });
        return res.json(activities)
    }catch(error){
        return next(error)
    }
})

module.exports = router;