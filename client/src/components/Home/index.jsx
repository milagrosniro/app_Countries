import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ActivityFilter from "../Order&Filter/ActivityFilter";
import ContinentFilter from "../Order&Filter/ContinentFilter";
import OrderAlf from "../Order&Filter/OrderAlf";
import SearchName from "../Order&Filter/SearchName";
import SortPopulation from "../Order&Filter/SortPopulation";
import Prev from "../Paging/Prev";
import Next from "../Paging/Next";
import CountryCard from "../Country/CountryCard";
import { getAllCountries } from "../../actions/actions";

export default function Home(){
    const countries = useSelector(e=> e.countriesLoaded);
    console.log(countries)
    const [search, setSearch] = useState();
    const [order, setOrder] = useState("ASC");
    const [sortByPopulation, setSortByPopulation] = useState("ASC");
    const [continent, setContinent] = useState("all");
    const [activity, setActivity] = useState("all");
    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(9);
    const dispatch = useDispatch()
     
    //traigo todos los paises
    useEffect(()=>{
                dispatch(getAllCountries()) //reemplaza el mapDispatchToProps
            },[])

    return(

        <div>
            <section>
                
            <div>
            <Link to="/postActivity">
            <button>CREAR ACTIVIDAD NUEVA</button>
                </Link>
            </div>
            <SearchName search={search} setSearch= {setSearch}/>
            </section>

            {/* FILTRADOS */}
            <section>
                <section>
                <SortPopulation sortByPopulation={sortByPopulation} setSortByPopulation={setSortByPopulation}/>
                <OrderAlf order={order} setOrder={setOrder}/>
                <ActivityFilter activity={activity} setActivity={setActivity}/>
                <ContinentFilter continent={continent} setContinent={setContinent}/>
                </section>

            {/* PAISES */}
            <section>
                <div>
                    {/* ACA VAN LOS BOTONES PARA PASAR ÑAS PAGINAS */}
                    <Prev indexStart={indexStart} setIndexStart={setIndexStart} indexEnd={indexEnd} setIndexEnd={setIndexEnd}/>
                    <Next indexStart={indexStart} setIndexStart={setIndexStart} indexEnd={indexEnd} setIndexEnd={setIndexEnd}/>
                </div>

                   
                {Array.isArray(countries) ? 
                countries.slice(indexStart,indexEnd).map(c=>{
                   return <CountryCard key={c.id} country={c}/>
                }):
                <p>{countries}</p>
            }
                
            </section>
            </section>

        </div>
    )
}


// import {React} from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {getAllCountries, continentFilter, activityFilter, sortAlf} from '../../actions/actions.js';
// import { Link } from 'react-router-dom';
// import CountryCard from '../Country/CountryCard.jsx';
// import Paging from '../Paging/Paging.jsx'
// import NavBar from '../NavBar/NavBar.jsx';


// //console.log(getAllCountries())
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