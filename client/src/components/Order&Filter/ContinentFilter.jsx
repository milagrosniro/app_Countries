import React from 'react';
import {useDispatch} from 'react-redux';
import { continentFilter } from '../../actions/actions';

export default function ContinentFilter({continent, setContinent}){
    const dispatch = useDispatch();
    // const [continent, setContinent] = useState("all");

    function handleSelectChange(e){
       setContinent(e.target.value)
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(continentFilter(e.target.value))
    }

    return(
       <section onSubmit={(e)=>{handleOnSubmit(e)}}>
           <label> FILTRAR POR CONTINENTE:
               <select value={continent} onChange={(e)=>{handleSelectChange(e)}}>
               <option value="all">None</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Polar">Polar</option>

               </select>

           </label>

           <button type="submit" value="Submit">FILTRAR</button>
       </section>
    )
}