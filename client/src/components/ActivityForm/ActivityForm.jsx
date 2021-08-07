import React from "react"
//import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
//importo acciones
import { postActivity  } from "../../actions/actions"


//FUNCION VALIDADORA, formulario controlado
//input es el estado local
function validate(info){
    let errors = {};
    if(!info.name){
        errors.name = "se requiere completar el Nombre";
    }else if(!info.dificulty){
        errors.dificulty = "se requiere completar la dificultad"
    }else if(/[a-zA-Z]+/g.test(info.duration)){
        errors.dificulty="solo se aceptan numeros"
    }else if(parseInt(info.duration)>24){
        errors.dificulty="la actividad debe durar menos de 24hs"
    }else if(!info.season.length){
        errors.season= "se requiere seleccionar la temporada de la actividad"
    }else if(!info.countryId.length){
        errors.countryId= "por favor selecciona un pais"
    }
    //si en el input hay un numero >10 y <0 enviar error
    return errors
}

export default function ActivityForm({activityPost, setActivityPost}){
    const dispatch = useDispatch();
    console.log("ACTIVITY POST ", activityPost)
    // const countriesFiltered = useSelector(e => e.countriesFiltered) //traigo del estado los paises filtrados

    function onInputChange(e){
        e.preventDefault();
      setActivityPost(prev =>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    
    function submitActivity(e) {
        e.preventDefault();
        dispatch(postActivity(activityPost))
    }
    return(
        <form onSubmit={(e)=>{submitActivity(e)}}>
            <label>NOMBRE:</label>
            <input type="text" 
                name="name" 
                value={activityPost.name} 
                onChange={(e)=>{onInputChange(e)}}/>

            <label>DIFICULTAD:</label>
            <input 
            type="text" 
            name="dificulty" 
            value={activityPost.dificulty} 
            onChange={(e)=>{onInputChange(e)}}
            />

            <label>DURACION:</label>
            <input 
            type="text" 
            name="duration" 
            value={postActivity.duration} 
            onChange={(e)=>{onInputChange(e)}}
            
            />

            <label>TEMPORADA:</label>
            <input 
            type="text" 
            name="season" 
            value={postActivity.season} 
            onChange={(e)=>{onInputChange(e)}}
            />
            <button type="submit">CREAR ACTIVIDAD</button>
        </form>
    )
}
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