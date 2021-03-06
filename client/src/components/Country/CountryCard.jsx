import React from 'react';
import { Link } from 'react-router-dom';
import classes from './countryCard.module.css'


//Este componente se usa para renderiza lo pedido de cada pais, obtengo esto desde el Home, tras hacer un map de todos los paises
export default function CountryCard({country}){
    return(
        <Link to={`/countries/${country.id}`} className={classes.link}>

        <div className={classes.card}>
            <h2 className={classes.name}>NOMBRE: {country.name}</h2>
            <h3> CONTINENTE: {country.region}</h3>
            <h4>POBLACION: {country.population}</h4>
            <img src={country.flag} alt='Flag Country'
            className={classes.flag}/>
        </div>
        </Link>
    )
}

