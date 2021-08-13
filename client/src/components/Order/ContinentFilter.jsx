import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { continentFilter } from '../../actions/actions';
import CountryCard from '../Country/CountryCard';

export default function ContinentFilter({continent, setContinent, countries}){
    const dispatch = useDispatch();
    
    const countriesFiltered = useSelector(e => e.countriesFiltered)
    console.log(continent)

    function handleSelectChange(e){
        dispatch(continentFilter(e.target.value))
        setContinent(e.target.value) 
    }

    // function handleOnSubmit(e){
    //     e.preventDefault();
    //     // dispatch(continentFilter(continent))
        
    // }

    return(
       <section 
       style={{padding:"2%", textAlign:"center", width:"80%"}}
      >
           <label style={{margin:"1%"}}> FILTRAR POR CONTINENTE:
               <select value={continent} onChange={(e)=>{handleSelectChange(e)}}
               style={{marginLeft:"2%"}}
               >
               <option value="all">None</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Polar">Polar</option>

               </select>

           </label>

           <button type="submit" value="Submit" style={{marginLeft: "1%",
    borderRadius: "28px"}} >FILTRAR</button>
    
       </section>
       
    )
}