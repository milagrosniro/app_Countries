
import React from "react";
import { Link } from 'react-router-dom';
import classes from './landing.module.css'

//importar estilos, agregar imagen en los estilos


export default function Landing(){
    return (
        <section className={classes.landing}>
            <div className={classes.left}>
                <div className={classes.leftData}>
                   <h1 className={classes.title}>BIENVENIDOS A LA AVENTURA</h1> 
            <Link to="/countries">
            <button className={classes.btn}>START</button>
            </Link>
                </div>
            </div>            
        </section>
    )
}