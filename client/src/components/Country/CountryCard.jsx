import React from 'react';
import { Link } from 'react-router-dom';
// Imagen de la bandera
// Nombre
// Continente

//Este componente se usa para renderiza lo pedido de cada pais, obtengo esto desde el Home, tras hacer un map de todos los paises
export default function CountryCard({country}){
    return(
        <Link to={`/countries/${country.id}`}>

        <div>
            <h2>NOMBRE: {country.name}</h2>
            <h3> CONTINENTE: {country.region}</h3>
            <h4>POBLACION: {country.population}</h4>
            <img src={country.flag} alt='Flag Country' width='200px' height='250px'/>

        </div>
        </Link>
    )
}

