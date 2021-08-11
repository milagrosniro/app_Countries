import React from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../actions/actions';

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
        <div style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            padding: "1%",
            width: "70%"
        }}>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input type="search" name="name" placeholder="Ingrese el nombre del pais..."
                onChange={(e)=>{handleInputChange(e)}}
                style={{
                    border: "0",
            borderRadius: "30px",
            fontSize: "2rem",
            padding: "10px 30px",
            overflow: "auto",
            outline: "none"
                }}/>

                <div>

                </div>
            </form>
        </div>
    )
}