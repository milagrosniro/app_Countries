 const { Router } = require('express');
//const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const countriesRoutes = require('./countries.js');
// const activityRoutes = require('./activity.js')

//const router = express.Router()

 const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//  router.use('/countries', countriesRoutes )
//  router.use('/activity', activityRoutes)
router.get('/', (req,res)=>{
    res.send("ENTRE A INDEX /")
})


module.exports = router;
