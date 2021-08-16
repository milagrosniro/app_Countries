
const { Country, Activity } = require('../db.js');
const { Router } = require('express');


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
        await postActivity[0].addCountry(match);
    }
   
    res.json(postActivity)
    
}catch(error){
    next(error)
}
});



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



module.exports = router;


