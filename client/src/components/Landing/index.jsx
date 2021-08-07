
import React from "react";
import { Link } from 'react-router-dom';
// import style from "./landingPage.module.css"

//importar estilos, agregar imagen en los estilos


export default function Landing(){
    return (
        <div >

            <h1>WELCOME</h1>
            <img src={Image} alt="Image Countries"/>
            
            <Link to="/countries">
            <button>START</button>
            </Link>
        </div>
    )
}