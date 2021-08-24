
const { Country, Activity } = require('../db.js');
const { Router } = require('express');
const { Op } = require('sequelize')


const router = Router()

router.post('/',async(req,res,next)=>{
    
try{
    const{name,dificulty,duration,season,countryId}=req.body;
    let postActivity = await Activity.findOrCreate({
        where: {
            name: name,
            dificulty: dificulty,
            duration: duration,
            season: season
        },
       
    });
        for(let i=0; i<countryId.length; i++){
        const match = await Country.findOne({
            where:{
                id: countryId[i]
            }
        })
        //console.log("POST ACTIVITY",postActivity)
        await postActivity[0].addCountry(match); //pemrite hacer la relacion 
        //console.log("post con country", postActivity)
    }
   
    res.json(postActivity)
    
}catch(error){
    next(error)
}
});


//traer todas las actividades
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

//Modificar una actividad
router.put("/", async (req, res, next) => {
    try {
      const { name, dificulty, duration, season, countries } = req.body;
      const activity = await Activity.findOne({
        where: {
          name: {
            [Op.eq]: name,
          },
        },
      });
      //console.log("ACTIVIDAD", activity)

      activity.dificulty = dificulty;
      activity.duration = duration;
      activity.season = season;
      await activity.save();
  
      let ctry;
      if (Array.isArray(countries)) {
        ctry = await Promise.all(
          countries.map((country) => Country.findByPk(country.id))
        );
      }
      if (ctry) {
        await activity.setCountries(ctry);
      }
      return res.send(activity);
    } catch (error) {
      next(error);
    }
  });

  //eliminar
 router.delete('/:id', async (req,res, next)=>{
     const {id}= req.params
    try{
        const activity = await Activity.destroy({
            where: {
              id: {
                [Op.eq]: id,
              },
            },
          });
          
          res.json(`Actividad ${id} eliminada`)
    }catch(err){
        next(err)
    }
 })






module.exports = router;


