import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import OrderAlf from "../Order/OrderAlf";
import SortPopulation from "../Order/SortPopulation";
import CountryCard from "../Country/CountryCard";
import { getAllCountries, continentFilter, getCountryByName, getAllActivities, activityFilter } from "../../actions/actions";
import classes from "./home.module.css";
import Paged from "../Paging/Paging";



export default function Home() {
    const dispatch = useDispatch()
    const countriesFiltered = useSelector(e => e.countriesFiltered)
    const [search, setSearch] = useState();
    const [order, setOrder] = useState("ASC");
    const [sortByPopulation, setSortByPopulation] = useState("ASC");
    const [currentPage, setCurrentPage] = useState(1) //nro de pagina
    const [countriesPerPage, setCountriesPerPage] = useState(9) //paises por pagina
    const indexOfLastCountries = currentPage * countriesPerPage //const para indicar hasta que pais mostrar en cada pag
    const indexOfFisrtCountries = indexOfLastCountries - countriesPerPage //const para indicar desd que pais mostrar en cada pag
    const currentCountries = countriesFiltered.slice(indexOfFisrtCountries, indexOfLastCountries) //paises que se muestran en la pagina. 

    const allActivities = useSelector(state => state.allActivities)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //traigo todos los paises cuando se renderiza el componente
    useEffect(() => {
        dispatch(getAllCountries()) //reemplaza el mapDispatchToProps
        dispatch(getAllActivities())
    }, [])

    function handleFilterActivity(e) {
        dispatch(activityFilter(e.target.value))
        
    }

    function handleSelectContinentChange(e) {
        dispatch(continentFilter(e.target.value)) //despacho la acc que filtra por continente con el e.target.value. Esta accion modifica el estado de countriesFiltered
       
    }
    function handleSubmitSearchName(e) {
        e.preventDefault();
        dispatch(getCountryByName(search)) //llamo a la funcion que busca por nombre
        setSearch("") 
    }
    function handleInputChangeName(e) {
        setSearch(e.target.value) //seteo el estado interno que cree para luego enviarlo en la funcion
    }

    function onClickCountries(e) {
        dispatch(getAllCountries()) //traigo todos los paises
    }

    return (
        <div>
            <section className={classes.sectionTop}>

                <div className={classes.addActivity}>
                    {/* Link que lleva a la seccion para crear la actividad */}
                    <Link to="/postActivity" className={classes.link}>
                        <button className={classes.btnAddActivity}>CREAR ACTIVIDAD NUEVA</button>
                    </Link>
                </div>


                <div className={classes.divSearch}>
                    {/* Seccion para buscar por pais */}

                    <form className={classes.form} onSubmit={(e) => { handleSubmitSearchName(e) }}>
                        <h2>Ingrese el nombre del pais</h2>
                        <input  type="text" name="name" placeholder="Argentina"
                            onChange={(e) => { handleInputChangeName(e) }}/>
                        <div>

                        </div>
                    </form>
                </div>

            </section>

            {/* FILTRADOS */}
            <section className={classes.sectionResult}>
                <section className={classes.filters}>

                    {/* Boton para cargar todos los paises */}
                    <button type="submit" onClick={(e) => { onClickCountries(e) }}>Cargar todos los paises</button>


                    <SortPopulation sortByPopulation={sortByPopulation} setSortByPopulation={setSortByPopulation} />
                    <OrderAlf order={order} setOrder={setOrder} />
                
                    <label className={classes.label}>FILTRAR POR ACTIVIDAD(selecciona la actividad y sabras en que paises podras realizarla)</label>

                    <select onChange={e => handleFilterActivity(e)}>
                        <option>Actividad</option>
                        {allActivities?.length &&
                            allActivities.map(a => {
                                return (
                                    <option className={classes.option} key={a.id} value={a.name}>{a.name}</option>
                                )
                            })

                        }
                    </select>

                    {/* FILTRADO POR CONTINENTE  */}
                    <section className={classes.continentSection}>
                        <label className={classes.labelContinent}> FILTRAR POR CONTINENTE:

                            <select className={classes.selectContinent} onChange={(e) => { handleSelectContinentChange(e) }}>
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
                        <Paged countriesPerPage={countriesPerPage} totalCountries={countriesFiltered.length} paginado={paginado} />
                    </div>

                    <div className={classes.sectionCountries}>
                      {currentCountries ? currentCountries.map(c => {
                                return <CountryCard key={c.id} country={c} />
                            }) :<p>{countriesFiltered}</p>}
                    </div>
                </section>
            </section>

        </div>
    )
}



