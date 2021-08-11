import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postActivity, getCountryByName, getAllCountries } from "../../actions/actions"
import classes from './activityForm.module.css';
import axios from "axios";


function validate(info, countryId) {
    let errors = {};
    if (!info.name) {
        errors.name = "se requiere completar el Nombre";
    }
    else if (!info.dificulty) {
        errors.dificulty = "se requiere completar la dificultad"
    }
    
    else if (typeof parseInt(info.dificulty) !== "number") {
        errors.dificulty = "solo se aceptan numeros"
    } else if (!info.duration.length) {
        errors.duration = "se requiere completar la duracion"
    } else if (!info.season.length) {
        errors.season = "se requiere seleccionar la temporada de la actividad"
    } else if(!countryId){
        errors.countryId= "se requiere seleccionar pais"
    }
    //si en el input hay un numero >10 y <0 enviar error
    return errors
}

 export default function ActivityForm() {
     const dispatch = useDispatch()
      const countries = useSelector(state => state.countriesLoaded)
      const [errors, setErrors] = useState({})
      const [countryId, setCountryId]= useState([])

        const [activityPost, setActivityPost] = useState({ //creo estado con la actividad q se va a postear
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        // countryId: [] //hacer una manera que se una el countryId al
    })

    function handleChange(e) {
        if(e.target.name === "countryId"){
            console.log(e.target.value)
        setCountryId([...countryId, e.target.value])
        console.log("country IDDD", countryId)
        }
        else{

            setActivityPost({
                ...activityPost,
                [e.target.name] : e.target.value
            }); //primero seteo el estado local
            setErrors(validate({ //luego seteo el estado de errores, pasandole el estado setetado
                ...activityPost,
                [e.target.name] : e.target.value
            }, [...countryId, e.target.value]))
        }

        console.log("estadosssss", countryId, activityPost)
        console.log("ERRORES", errors)
    };


  async function handleSubmit(e) {

    e.preventDefault();
    const activityComplete= {...activityPost, countryId: countryId} //uno el objeto de activityPost con el estado de country
    
    // if(Object.keys(errors).length === 0){
        //posteo la actividad desde el axios 
        const res = await axios.post('http://localhost:3001/activity', activityComplete);
        // dispatch(postActivity(activityPost)) //despacho la funcion para postear el personaje con el estado
        alert("Actividad creada!")
        setActivityPost({ //y seteo el estado 
            name: "",
            dificulty: "",
            duration: "",
            season: "",
            
        });
        setCountryId([])
    // } else if(errors){ 

    //     alert("Debes completar todos los campos requeridos para agregar la Actividad")
    // }
    
    console.log(errors)
    console.log("prueba", activityComplete)
}


    useEffect(() => {
        dispatch(getAllCountries()); //hacer una copia por las dudas, para que no cambie segun los cambio de los filtrados
    }, [dispatch])

return(
    <section className={classes.name}>
   {/* BOTON PARA VOLVER A HOME */}
               <Link to="/countries" style={{ color: "black", margin: "1%", textDecoration: "none" }}>
                <button className={classes.btnForm} style={{ fontSize: "1rem" }}>VOLVER A HOME</button>

             </Link>
             <h1>Crea  la actividad turistica</h1>
            {/* Hago el formulario */}
            <form className={classes.form} onSubmit={e => {handleSubmit(e)}}>


            <div>
                    <label className={classes.labelForm}>Nombre:</label>
                    <input className={classes.inputForm} type='text' value={activityPost.name} name='name'
                     onChange={(e) => {handleChange(e)}}>  
                    </input>
                    {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className={classes.labelForm}>Dificultad:</label>
                    <input className={classes.inputForm} type='number' value={activityPost.dificulty} name='dificulty'
                     onChange={e => handleChange(e)}>  
                    </input>
                    {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    {errors.dificulty && ( <p className='error'>{errors.dificulty}</p> )}
                </div>

                <div>
                    <label className={classes.labelForm}>Duracion:</label>
                    <input className={classes.inputForm} type='text' value={activityPost.duration} name='duration'
                     onChange={e => handleChange(e)}>  
                    </input>
                    {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    {errors.duration && (
                        <p className='error'>{errors.duration}</p>
                    )}
                </div>

                <div>
                    <label className={classes.labelForm}>Temporada del año:</label>
                    <select name="season" value={activityPost.season} onChange={e =>handleChange(e)}>
                        <option value="verano">Verano</option>
                        <option value="invierno">Invierno</option>
                        <option value="primavera">Primavera</option>
                        <option value="otoño">Otoño</option>
                    </select>
                    {/* <label className={classes.labelForm}>Temporada del año:</label>
                    <input className={classes.inputForm} type='text' value={activityPost.season} name='season'
                     onChange={e => handleChange(e)}>  
                    </input>
                    {/* Debajo de cada input prgeunto si hay algo en error.nombredelinput y si hay algo lo renderizo .TMB ES NECESARIO HACER LA VALIDACION EN EL BACK*/}
                    {errors.season && (
                        <p className='error'>{errors.season}</p>
                    )} 
                </div>
                     <label className={classes.labelForm}>Selecciona el Pais</label>
                    <select name="countryId"  onChange={e =>handleChange(e)} multiple> 
                                      
                    {countries.map(c =>(<option key={c.id} value={c.id}>{c.name}</option>)) }
                   
                    </select>
                   
                    {errors.countryId && ( <p className='error'>{errors.countryId}</p>)}

                    <button className={classes.btnForm} type='submit'>Crear Actividad</button>
            </form>
    </section>
)
   
 }


//     function handleSelect(e) {
//         console.log(e.target.value)
//         setCountryId([...countryId, e.target.value])
//         console.log("country IDDD", countryId)
//     //   setActivityPost({
//     //        ...activityPost,
//     //     //    countryId: [
//     //     //        ...activityPost.countryId, //le paso lo que ya habia y le agrego el e.targe.value
//     //     //        e.target.value
//     //     //    ]
//     //    });
      
//        setErrors(validate({ //luego seteo el estado de errores, pasandole el estado setetado
//         ...activityPost,
//         [e.target.name] : e.target.value
//     }))
    
//    };


// export default function ActivityForm() {
//     const dispatch = useDispatch();
//     const countrieByName = useSelector(e => e.countriesFiltered); //traigo los paises filtrados del estado
//     const [errors, setErrors] = useState({})
//     const [name, setName] = useState("") //estado para el input

//     useEffect(() => {
//         dispatch(getCountryByName(name))
//     }, [name]) //despacho la funcion de obtener pais por nombre cada vez q hay un cambio en el estado de nombre.
//     //esta funcion modifica el countriesFiltered

//     const [activityPost, setActivityPost] = useState({ //creo estado con la actividad q se va a postear
//         name: "",
//         dificulty: "",
//         duration: "",
//         season: "",
//         countryId: [] //hacer una manera que se una el countryId al
//     })


//     //agrego el id del Pais sobre el q quiero agergar la activ
//     function handleChooseButton(id) {
//         setActivityPost({
//             ...activityPost,
//             countryId: [...activityPost.countryId, id]
//         })
        
//     }

//     function handleNameChange(e) {
//         e.preventDefault();
//         setName(e.target.value); //actualizo el estado name
//     }

//     function onInputChange(e) {
//         e.preventDefault(); //actualizo el estado de activity
//         setActivityPost(prev => {
//             return {
//                 ...prev,
//                 [e.target.name]: e.target.value
//             }
//         })
//         // setErrors(validate({
//         //             ...errors,
//         //             [e.target.name]: e.target.value
//         //         }))

//     }

//     function submitActivity(e) {
//         e.preventDefault();
//         console.log("ACTIVIDAD POR POSTEAR", activityPost)
//         dispatch(postActivity(activityPost)) //despacho la funcion que postea la actividad
//          console.log("ACTIVIDAD POSTEADA", activityPost)
//         // setErrors(validate({
//         //     ...errors,
//         //     [e.target.name]: e.target.value
//         // }))
//     }
//     return (

//         <section>
//             {/* BOTON PARA VOLVER A HOME */}
//             <Link to="/countries" style={{ color: "black", margin: "1%", textDecoration: "none" }}>
//                 <button style={{ fontSize: "1rem" }}>VOLVER A HOME</button>
//             </Link>

//             <section style={{ width: "100vh" }}>
//                 <span style={{ fontSize: "2rem", textAlign: "end", display: "flex" }}>CREA UNA ACTIVIDAD</span>
//             </section>

//             <div style={{
//                 alignItems: "center", backgroundColor: "#EDFFD9", borderRadius: "0 20px 0 20px", display: "flex", flexDirection: "column", flexWrap: "nowrap", height: "100%", justifyContent: "center",
//                 marginBottom: "2%", width: "100%"
//             }}>

//                 {/* // STYLES FORM */}
//                 <form onSubmit={(e) => { submitActivity(e) }}
//                     style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
//                     {/* LABEL */}
//                     <label
//                         style={{ fontSize: "1rem", margin: "3%" }}>NOMBRE:</label>
//                     {errors.name && <p>{errors.name}</p>}

//                     {/* INPUT */}
//                     <input type="text"
//                         name="name"
//                         value={activityPost.name}
//                         onChange={(e) => { onInputChange(e) }}

//                         style={{ fontSize: "1rem", margin: "1%", textAlign: "center" }} />

//                     {/* LABEL */}
//                     <label style={{ fontSize: "1rem", margin: "3%" }}>DIFICULTAD: <span style={{ fontSize: "20px" }}>del 1 al 5</span></label>
//                     {errors.dificulty && <p>{errors.dificulty}</p>}

//                     {/* INPUT */}
//                     <input
//                         type="text"
//                         name="dificulty"
//                         value={activityPost.dificulty}
//                         onChange={(e) => { onInputChange(e) }}
//                         style={{ fontSize: "1rem", margin: "1%", textAlign: "center" }}
//                     />

//                     <label
//                         style={{ fontSize: "1rem", margin: "3%" }}>DURACION: <span style={{ fontSize: "20px" }}>en minutos</span></label>
//                     {errors.duration && <p>{errors.duration}</p>}
//                     <input
//                         type="text"
//                         name="duration"
//                         value={postActivity.duration}
//                         onChange={(e) => { onInputChange(e) }}
//                         style={{ fontSize: "1rem", margin: "1%", textAlign: "center" }}
//                     />

//                     <label style={{ fontSize: "1rem", margin: "3%" }}>TEMPORADA:<span style={{ fontSize: "20px" }}>verano,otoño,invierno,primavera</span></label>
//                     {errors.season && <p>{errors.season}</p>}
//                     <input
//                         type="text"
//                         name="season"
//                         value={postActivity.season}
//                         onChange={(e) => { onInputChange(e) }}
//                         style={{ fontSize: "1rem", margin: "1%", textAlign: "center" }}
//                     />

//                     {/* BUSCAR PAIS */}

//                     <input
//                         placeholder="Buscar pais por nombre..."
//                         autoComplete="off"
//                         value={name}
//                         type="text"
//                         onChange={(e) => handleNameChange(e)}
//                     ></input>
//                     {/* BUTTON */}
//                     <button type="submit" style={{ fontSize: "1rem", margin: "3%" }}>CREAR ACTIVIDAD</button>
//                     </form>

//                     {/* STYLEDULLIST */}
//                     <p style={{ columns: "3", textAlign: "justify" }}>

//                         <div>

//                             <ul style={{ backgroundColor: "#EDFFD9", borderRadius: "0 20px", height: "40vh", listStyle: "none", overFlow: "hidden", overFlowY: "scroll" }}>
//                                 {/* recorro todos los paises y muestro su nombre con un boton para asociarlos a la activ */}
//                                 {countrieByName ? countrieByName.map(c =>
//                                     <div >
//                                         {/* STYLED ITEM */}
//                                         <span>

//                                             <li key={c.id} style={{ margin: "5px" }}>
//                                                 {c.name}
//                                                 <button value=""onClick={() => { handleChooseButton(c.id) }}
//                                                     style={{ marginLeft: "5px", backgroundColor: "#EDFFD9" }}>AGREGAR</button>
//                                             </li>
//                                         </span>
//                                     </div>
//                                 ) :
//                                     <li>Pais no encontrado</li>
//                                 }
//                             </ul>
//                         </div>
//                     </p>

              
//             </div>
//         </section>
//     )
// }







//FUNCION VALIDADORA, formulario controlado
//input es el estado local




    // const[errors, setErrors] = useState({})

    //ejecuto la funcion de obtener todos los paises al renderizar el componente por primera vez
    // useEffect(()=>{
    //     dispatch(getAllCountries()) //reemplaza el mapDispatchToProps
    // },[])

    //funcion para ir actualizando el estado con los datos del formulario
    // function setInfoHandler(e){
    //     e.preventDefault();
    //     setInfo({
    //         ...info,
    //         [e.target.name]: e.target.value
    //     })
    //     setErrors(validate({
    //         ...info,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    // function findCountrieHandler(e,id){
    //     e.preventDefault();
    //     for(let i=0; i < countriesFiltered.length; i++){
    //         if(countriesFiltered[i].id === id && !info.countryId.includes(countriesFiltered[i])){
    //             setInfo({
    //                 ...info,
    //                 countryId: [...info.countryId, countriesFiltered[i]]
    //             })
    //         }
    //     }
    //     setErrors(validate({
    //         ...info,
    //         ["countryId"]: ""
    //     }))
    // }

    // //funcion que se ejecuta al filtrar Paises por nombre
    // function filterCountriesHandler(e){
    //     e.preventDefault();
    //     getCountryByName(input)
    // }

    // //funcion que se ejecuta al presionar el boton de agregar actividad
    // function handleSubmit(e){
    //     e.preventDefault();
    //     var form = true;

    //     //transfomo el obj de errores en con de array, lo recorro y pregunto si hay algun value, si es asi, el form es false y no se puede enviar
    //     Object.entries(errors).forEach(([key,value])=>{
    //         if(value.length>0){
    //             form = false
    //         }
    //     })

    //     //si esta todo bien, despacho la accion de postear la actividad, agrego un alert y seteo el estado local
    //     if(form){
    //        dispatch(postActivity(info))
    //        alert("Actividad Creada")
    //        setInfo({
    //         name:"",
    //         dificulty: 1,
    //         duration: "",
    //         season:"",
    //         countryId:[]
    //        });

    //     }else{
    //         return alert("No se ha podido agregar la actividad, intetalo de nuevo")
    //     }
    // }
//     return(
//         <div>
//             <Link to='/countries'>Volver a Todos los paises</Link>
//             <h1>Crea tu actividad turistica</h1>
//             <form onSubmit={(e)=>{handleSubmit(e)}}>
//                 <div>
//                     <label>Nombre de la Actividad:</label>
//                     {errors.name && <p>{errors.name}</p>}
//                     <input type="text" name="name" value={activityPost.name}
//                     onChange={(e)=>{onInputChange(e)}} ></input>
//                 </div>
//                 <div>

//                     <label>Dificultad:</label>
//                     <select type="text" name="dificulty"
//                     value={activityPost.dificulty}
//                      onChange={(e)=>{onInputChange(e)}} >

//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
//                     <option value={4}>4</option>
//                     <option value={5}>5</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label htmlFor="">Duracion en horas:</label>
//                     {errors.duration && <p>{errors.duration}</p>}
//                     <input type="text" name="duration" value={activityPost.duration}
//                      onChange={(e)=>{onInputChange(e)}}
//                    ></input>
//                 </div>
//                 <div>
//                     <label>Temporada:</label>
//                     {errors.season && <p>{errors.season}</p>}
//                     <select type="text" name="season" value={activityPost.season}
//                      onChange={(e)=>{onInputChange(e)}}
//                    >
//                         <option value="autumn">Otoño</option>
//                         <option value="winter">Invierno</option>
//                         <option value="spring">Primavera</option>
//                         <option value="summer">Verano</option>

//                         </select> 
//                 </div>
//                 <div>
//                     <label>Paises:</label>
//                     {errors.countryId && <p>{errors.countryId}</p>}
//                         <input placeholder="encuentra tu pais..." name="countryId" value={activityPost.countryId}
//                         onChange={(e)=>{setInfoHandler(e)}}
//                         ></input>
//                     <div>
//                     <input type="submit"
//                     onClick={(e)=>{filterCountriesHandler(e)}}></input>

//                     </div>

//                 <div>
//                     {countriesFiltered.length ?
//                     countriesFiltered.map(c=>
//                         <CountryCard  name={c.name} flag={c.flag} key={c.id} findCountrieHandler={(e)=>{findCountrieHandler(e,c.id)}} /> )
//                         : <div >
//                         <h3>Error</h3>
//                         <p>El pais no se encuentra en la Lista</p>
//                     </div>}
//                 </div>
//                 <div >
//                     <div >
//                         {/* PARA AGREGAR LA ACTIVIDAD AL PAIS */}
//                         <p>Agrega esta actividad a :</p>
//                         <hr/>
//                         {info.countryId && info.countryId.map((c)=>
//                          <span>{`${c.name} - `}</span>
//                         )}
//                     </div>
//                 </div>

//                 </div>
//                 <div>
//                     <input type="submit" value="add activity">AGREGAR ACTIVIDAD</input>
//                 </div>
//             </form>
//         </div>
//     )
// } 