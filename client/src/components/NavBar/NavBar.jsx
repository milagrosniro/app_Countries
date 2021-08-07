import React, { useEffect, useState} from "react"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
//importo acciones
import { getCountryByName } from "../../actions/actions"

//NO SE ESTAN DESPACHANDO LAS ACCIONES!!!!!!!!!!!!!!!!!!!!!!

//BUSCADOR: hace un input y boton con las funciones que seten el stado
//TENER EN CUENTA EL TEMA DE LAS MAYUSCULAS Y MINUSCULAS, SE PUEDE HACER EN EL BACK, ya esta hecho con el iLike

export default function NavBar(){
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    console.log(name)

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmitButton(e){
        e.preventDefault();
        console.log("SE EJECUTO EL SUBMIT")
        dispatch(getCountryByName(name));
        console.log("SE EJECUTO EL GETBYNAME")
        setName("");
    }

    return(
        <div>
            <input type="text" 
            placeholder="Ingrese el pais que desea buscar"
            onChange={(e)=>{handleInputChange(e)}}
            ></input>
            <button type="submit"
            onSubmit={(e)=>{handleSubmitButton(e)}}
            >BUSCAR</button>
        </div>
    )
}