const express = require('express')
const {Country} = require('../models/Country')
const { Router } = require('express');
const {Activity} = require('../models/Activity');

const router = Router()
// [ ] POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos

router.post('/activity', async (req,res)=>{
    // ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)
const {id, name, dificulty, duration, season} = req.body

//const users = await store.users.findOrCreate({ where: { email } });
const activity = await Activity.findOrCreate({
    where: {
        name: name,
        dificulty: dificulty,
        duration: duration,
        season: season
    }
})
return res.json(activity)

})

module.exports = router;