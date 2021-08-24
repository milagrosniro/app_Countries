import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries } from "../../actions/actions"
import classes from './activityForm.module.css';
import axios from "axios";



function validate(info, countryId) {
    let errors = {};
    if (!info.name) {
        errors.name = "se requiere completar el Nombre";
    }
    if (!info.dificulty) {
        errors.dificulty = "se requiere completar la dificultad"
    } if (info.dificulty > 5 || info.dificulty < 1) {
        errors.dificulty = "se requiere colocar una dificultad del 1-5"
    }
    if (!info.duration) {
        errors.duration = "se requiere completar la duracion"
    } if (info.duration > 24) {
        errors.duration = "agregar duracion menor a 24 hs"
    }
    if (!info.season.length) {
        errors.season = "se requiere seleccionar la temporada de la actividad"
    } if (!countryId.length) {
        errors.countryId = "se requiere seleccionar pais"
    }

    return errors
}

export default function ActivityForm() {
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countriesLoaded)
    

    const [errors, setErrors] = useState({})
    const [countryId, setCountryId] = useState([])

    const [activityPost, setActivityPost] = useState({ //creo estado con la actividad q se va a postear
        name: "",
        dificulty: "",
        duration: "",
        season: "",
    })

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    function handleChange(e) {
        if (e.target.name === "countryId") {
            setCountryId([...countryId, e.target.value])
            // console.log("COUNTRY", countryId)
        }
        else {
            setActivityPost({
                ...activityPost,
                [e.target.name]: e.target.value
            }); //primero seteo el estado local
        }
        setErrors(validate({ //luego seteo el estado de errores, pasandole el estado setetado
            ...activityPost,
            [e.target.name]: e.target.value
        }, countryId))
    };
    function handleDelete(el){
        setCountryId(countryId.filter(occ => occ !== el))
        console.log("COUNTRYID",countryId)
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const activityComplete = { ...activityPost, countryId: countryId } //uno el objeto de activityPost con el estado de country

        if (Object.keys(errors).length === 0) {
            //posteo la actividad desde el axios 
            const res = await axios.post('http://localhost:3001/activity', activityComplete);
            alert("Actividad creada!")
            setActivityPost({ //y seteo el estado 
                name: "",
                dificulty: "",
                duration: "",
                season: "",
            });
            setCountryId([])

        } else if (Object.keys(errors).length > 0) {
            alert("Debes completar todos los campos requeridos para agregar la Actividad")
        }
    }

   
  

    return (
        <section className={classes.name}>


            <h1>Crea  la actividad turistica</h1>
            {/* BOTON PARA VOLVER A HOME */}
            <Link to="/countries" >
                <button className={classes.btnForm} >VOLVER A HOME</button>
            </Link>

            
            {/* Hago el formulario */}
            <form className={classes.form} onSubmit={e => { handleSubmit(e) }}>
                <div className={classes.form1}>

                    <label >Selecciona el Pais</label>
                    <select name="countryId"  onChange={e => handleChange(e)} >
                        <option>Paises</option>
                        {countries.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                   
                
                    {errors.countryId && (<p className={classes.p}>{errors.countryId}</p>)}
                </div>

                <div className={classes.form1}>
                    <label >Nombre:</label>
                    <input className={classes.inputForm} type='text' value={activityPost.name} name='name'
                        onChange={(e) => {handleChange(e) }}>
                        {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    </input>
                    {errors.name && (<p className={classes.p}>{errors.name}</p>)}
                </div>

                <div className={classes.form1}>
                    <label >Dificultad:</label>
                    <input className={classes.inputForm} type='number' value={activityPost.dificulty} name='dificulty'
                        onChange={e => handleChange(e)}>
                    </input>
                    {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    {errors.dificulty && (<p className={classes.p}>{errors.dificulty}</p>)}
                </div>

                <div className={classes.form1}>
                    <label >Duracion (en horas) :</label>
                    <input className={classes.inputForm} type='number' value={activityPost.duration} name='duration'
                        onChange={e => handleChange(e)}>
                    </input>
                    {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    {errors.duration && (<p className={classes.p}>{errors.duration}</p>)}
                </div>

                <div className={classes.form1}>
                    <label >Temporada del año:</label>
                    <select name="season" value={activityPost.season} onChange={e => handleChange(e)}>
                        <option value="temporada">Temporada</option>
                        <option value="verano">Verano</option>
                        <option value="invierno">Invierno</option>
                        <option value="primavera">Primavera</option>
                        <option value="otoño">Otoño</option>
                    </select>
                    {errors.season && (<p className={classes.p}>{errors.season}</p>)}
                </div>



                <button className={classes.btnForm2} type='submit'>Crear Actividad</button>
            </form>
            {countryId.map(el =>
                <div> 
                    <p className={classes.form1}>{el}</p>
                    <button onClick={()=> handleDelete(el)}>X</button>
                </div>)}
        </section>
    )
}
