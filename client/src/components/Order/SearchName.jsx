import React from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../actions/actions';
import classes from './order&filter.module.css'

export default function SearchName({search, setSearch}){
    const dispatch = useDispatch();

   
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountryByName(search))
        setSearch("")
    }

    function handleInputChange(e){     
        setSearch(e.target.value)
    }

    
    return(
        <div className={classes.divSearchName}>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input className={classes.inputSearchName} type="search" name="name" placeholder="Ingrese el nombre del pais..."
                onChange={(e)=>{handleInputChange(e)}}
               />

                <div>

                </div>
            </form>
        </div>
    )
}