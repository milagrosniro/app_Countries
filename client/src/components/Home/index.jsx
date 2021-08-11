import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ActivityFilter from "../Order&Filter/ActivityFilter";
 //import ContinentFilter from "../Order&Filter/ContinentFilter";
import OrderAlf from "../Order&Filter/OrderAlf";
// import SearchName from "../Order&Filter/SearchName";
import SortPopulation from "../Order&Filter/SortPopulation";
// import Prev from "../Paging/Prev";
// import Next from "../Paging/Next";
import CountryCard from "../Country/CountryCard";
import { getAllCountries, continentFilter, getCountryByName } from "../../actions/actions";
import classes from "./home.module.css";
import Paged from "../Paging/Paging";



export default function Home(){
    const dispatch = useDispatch()
    const countries = useSelector(e=> e.countriesLoaded); //traigo TODOS los paises
    const countriesFiltered = useSelector(e => e.countriesFiltered)
    console.log(countries)
    const [search, setSearch] = useState();
    const [order, setOrder] = useState("ASC");
    const [sortByPopulation, setSortByPopulation] = useState("ASC");
    const [activity, setActivity] = useState("all");
    const [currentPage, setCurrentPage]=useState(1) //nro de pagina
    const [countriesPerPage, setCountriesPerPage]= useState(9) //paises por pagina
    const indexOfLastCountries= currentPage * countriesPerPage //const para indicar hasta que pais mostrar en cada pag
    const indexOfFisrtCountries= indexOfLastCountries - countriesPerPage //const para indicar desd que pais mostrar en cada pag
    const currentCountries = countriesFiltered.slice(indexOfFisrtCountries, indexOfLastCountries) //paises que se muestran en la pagina. 
    
    const paginado= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    //traigo todos los paises cuando se renderiza el componente
    useEffect(()=>{
                dispatch(getAllCountries()) //reemplaza el mapDispatchToProps
            },[])

            function handleSelectContinentChange(e){
                dispatch(continentFilter(e.target.value)) //despacho la acc que filtra por continente con el e.target.value. Esta accion modifica el estado de countriesFiltered
                
            }
            function handleSubmitSearchName(e){
                e.preventDefault();
                dispatch(getCountryByName(search)) //llamo a la funcion que busca por nombre
                setSearch("") //NO SE SETEA EL VALOR DE SEARCH!!!!
            }
            function handleInputChangeName(e){     
                setSearch(e.target.value) //seteo el estado interno que cree para luego enviarlo en la funcion
            }

            function onClickCountries(e){
                dispatch(getAllCountries()) //traigo todos los paises
            }
            
    return(

        <div className={classes.div}>
            <section className={classes.sectionTop}>
                
            <div className={classes.addActivity}>
                {/* Link que lleva a la seccion para crear la actividad */}
            <Link to="/postActivity" className={classes.link}>
            <button className={classes.btnAddActivity}>CREAR ACTIVIDAD NUEVA</button>
                </Link>
            </div>
           

            <div style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            padding: "1%",
            width: "70%"
        }}>
            {/* Seccion para buscar por pais */}
            <form onSubmit={(e)=>{handleSubmitSearchName(e)}}>
                <input type="text" name="name" placeholder="Ingrese el nombre del pais..."
                onChange={(e)=>{handleInputChangeName(e)}}
                style={{border: "0",borderRadius: "30px",fontSize: "2rem",padding: "10px 30px",overflow: "auto",outline: "none" }}/>

                <div>
            
                </div>
            </form>
        </div>

            </section>

            {/* FILTRADOS */}
            <section className={classes.sectionResult}>
                <section className={classes.filters}>

                {/* Boton para cargar todos los paises */}
                <button type="submit" onClick={(e)=>{onClickCountries(e)}}>Cargar todos los paises</button>


                <SortPopulation sortByPopulation={sortByPopulation} setSortByPopulation={setSortByPopulation}/>
                <OrderAlf order={order} setOrder={setOrder} />
                <ActivityFilter activity={activity} setActivity={setActivity}/>

               
               {/* FILTRADO POR CONTINENTE  */}
                <section style={{padding:"2%", textAlign:"center", width:"80%"}}>
                <label style={{margin:"1%"}}> FILTRAR POR CONTINENTE:
               
               <select onChange={(e)=>{handleSelectContinentChange(e)}}
               style={{marginLeft:"2%"}}>
               <option value="all">Todos</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Polar">Polar</option>

               </select>

           </label>
       </section>
                </section>

            {/* SECCION DONDE SE RENDERIZAS LAS COUNTRYCARD  */}
            <section className={classes.countries}>
                <div className={classes.pageBtn}>
                    {/* PAGINADO */}
                    
                    <Paged countriesPerPage={countriesPerPage} totalCountries= {countriesFiltered.length} paginado= {paginado} />

                 </div>

                   <div className={classes.sectionCountries}>

                   {currentCountries ? 
                currentCountries.map(c=>{
                   return <CountryCard key={c.id} country={c}/>
                }):
                <p>{countriesFiltered}</p>
            }
             
                </div>
            </section>
            </section>

        </div>
    )
}



// const [indexStart, setIndexStart] = useState(0); //indexFirstCounties, numero de indice sobre el que voy a hacer el slice
// const [indexEnd, setIndexEnd] = useState(9); //indexLastCountries numero de indice sobre el que voy a hacer el slice
  {/* <Prev indexStart={indexStart} setIndexStart={setIndexStart} indexEnd={indexEnd} setIndexEnd={setIndexEnd} totalPages={totalPages}/>

                    <Next indexStart={indexStart} setIndexStart={setIndexStart} indexEnd={indexEnd} setIndexEnd={setIndexEnd} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} countries={countries}/>  */}

// export default function Home(){
//     const dispatch = useDispatch(); //Hook oara ir despachando las acciones
//     const allCountries = useSelector((e) => e.countriesLoaded);
//    // const allCountries = useSelector(e => e.countriesLoaded); //traigo los paises del estado
//      console.log("TODOS LOS PAISES", allCountries)
//      console.log(typeof allCountries)
//     //PAGINADO
//     const [currentPage, setCurrentPage] = useState(1);
//     const [countriesPage, setCountriesPage] = useState(9);
//     const indexLastCountry = currentPage * countriesPage;
//     const indexFirstCountry = indexLastCountry - countriesPage;
//     //const currentCountries = allCountries.slice(indexFirstCountry,indexLastCountry)//paises q van a estar por pagina
//     // console.log("PRUEBAAAAAAAAAAAA",allCountries.slice(0,9))
//     // console.log(indexFirstCountry, indexLastCountry)
//     let currentCountries = allCountries.slice(indexFirstCountry, indexLastCountry)
//     const paged = (pageNumber) =>{ //es el numero de la pagina q tengo q renderizar
//         setCurrentPage(pageNumber) //seteo el numero d ela pagina, sirve para el renderizado
//     }

//     const [order, setOrder] = useState('');

//     //traigo los paises cuando el componente se monta  
//     useEffect(()=>{
//         dispatch(getAllCountries()) //reemplaza el mapDispatchToProps
//     },[dispatch]) //la accion se ejecuta dependiendo de lo q va en este segundo parametro

//     function handleClick(e){
//         e.preventDefault();//pa q la pag no se vuelva a cargar y no perder los estados
//         dispatch(getAllCountries())
//     }

//     function handleFilterRegion(e){
//         dispatch(continentFilter(e.target.value))
//     }

//     function handleFilterActivity(e){
//         dispatch(activityFilter(e.target.value))
//     }

//     function handleSort(e){
//         e.preventDefault();
//         dispatch(sortAlf(e.target.value))
//         setCurrentPage((1));//seteo el estado de la pagina en 1
//         setOrder(`Ordenado ${e.target.value}`) //seteo el estado de order que muestra de que manera se ordena)

//     }
//     return(
//         <div>
            
//             <Link to='/activity'>CREAR UNA ACTIVIDAD TURISTICA</Link>
//             <h1>BIENVENIDOS A LA AVENTURA</h1>
//             <NavBar/>
//             <button onClick={(e)=>{handleClick(e)}}>Cargar todos los paises</button>
//                  <div>
//                   {/* para que el cliente ordene los paises por nombre  */}
//                 <select onChange={e => handleSort(e)}>
//                     <option value='Asc'>Asc</option>
//                     <option value='Desc'>Desc</option>
//                 </select>
//                 </div>
//             <div>

//                 {/* ACA VAN LOS FILTROS  */}
//                 {/* FILTRAR POR CONTINENTE  */}
//                 <select onChange={e => handleFilterRegion(e)} >
//                     <option value='allC'>TODOS LOS PAISES</option>
//                     <option value='asia'>ASIA</option>
//                     <option value='europe'>EUROPE</option>
//                     <option value='africa'>AFRICA</option>
//                     <option value='oceania'>OCEANIA</option>
//                     <option value='americas'>AMERICAS</option>
//                     <option value='polar'>POLAR</option>
                    
//                 </select>

//                 {/* FILTRAR POR ACTIVIDAD TURISTICA
//                !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
//                <label>FILTRAR POR ACTIVIDAD 

//                 <select value={} >
//                     <option value='allActivities'>TODOS LAS ACTIVIDADES</option>
//                     <option value='europe'>EUROPE</option>
//                     <option value='africa'>AFRICA</option>
//                     <option value='oceania'>OCEANIA</option>
//                     <option value='americas'>AMERICAS</option>
//                     <option value='polar'>POLAR</option>
                    
//                 </select>
//                </label>
//                 {/* renderizo el paginado */}
//                 <Paging
//                 countriesPage= {countriesPage} allCountriesLength={allCountries.length} //necesito el largo del array, no todos los personajes 
//                 paged={paged}
//                 />
//                 {currentCountries && currentCountries.map(c =>{           
//                 return <CountryCard name={c.name} flag={c.flag} region={c.region} key={c.id}/>
//                 })}
//             </div>
//         </div>
//     )
// }