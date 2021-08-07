import React from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../actions/actions';

export default function SearchName({search, setSearch}){
    const dispatch = useDispatch();
   
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountryByName(search))
    }

    function handleInputChange(e){     
        setSearch(e.target.value)
        console.log("ESTADO INPUTTTT")
    }

    
    return(
        <div>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input type="search" name="name" placeholder="Ingrese el nombre del pais..."
                onChange={(e)=>{handleInputChange(e)}}/>
            </form>
        </div>
    )
}