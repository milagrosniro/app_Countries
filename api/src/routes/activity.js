
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
    // await postActivity.setCountries(countryId);
    // res.json(postActivity)

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



// router.post("/", async (req, res) => {
//     const { name, dificulty, duration, season, countryId } = req.body;
//     const activity = await Activity.create({
//       name,
//       dificulty,
//       duration,
//       season,
//     });
//     let ctry;

//     if (Array.isArray(countryId)) {
//       ctry = await Promise.all(
//         countryId.map((country) => Country.findByPk(country))
//       );
//     }
//     if (ctry) {
//       await activity.setCountries(ctry);
//     }
//     return res.send(activity);
//   });

// [ ] POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos
// router.post('/',async(req,res,next)=>{
//     //agregarle toUpperCase
// try{
//     const{name,dificulty,duration,season,countryId}=req.body;
//     console.log(countryId)
//     let [postActivity] = await Activity.findOrCreate({
//         where: {
//             name: name,
//             dificulty: dificulty,
//             duration: duration,
//             season: season
//         },
        
//     });

//     for(let i=0; i<countryId.length; i++){
//         const match = await Country.findOne({
//             where:{
//                 name: countryId[i]
//             }
//         })
//         await postActivity[0].addCountry(match);
//     }
//     await postActivity.setCountries(countryId);
//     res.json(postActivity)

// }catch(error){
//     next(error)
// }
// })
    // const{name,dificulty,duration,season,idCountry}=req.body;
  

   // try{
    //     const postActivity = await Activity.create({
    //         name: name,
    //         dificulty: dificulty,
    //         duration: duration,
    //         season: season
    //     })

    //     if(!Array.isArray(idCountry)){
    //         const country = await Country.findByPk(idCountry);
    //         await postActivity.addCountry(country)
    //         return res.send(postActivity)
    //     }else{
    //         idCountry.forEach(async(cId)=>{
    //             cId=cId.toUpperCase();
    //             const country = await Country.findByPk(cId);
    //             await postActivity.addCountry(country)       
    //         })
    //        return res.send(postActivity)
    //     }
    // }catch(error){
    //     next(error)
    // }
//})