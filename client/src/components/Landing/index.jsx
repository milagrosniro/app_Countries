
import React from "react";
import { Link } from 'react-router-dom';
import classes from './landing.module.css'

//importar estilos, agregar imagen en los estilos


export default function Landing() {
    return (
        <section className={classes.landing}>
            <div className={classes.container}>
                <div className={classes.neon}>
                    <h1 className={classes.title}>BIENVENIDOS A LA AVENTURA</h1>
                </div>
                <div className={classes.btnContainer}>
                    <Link to="/countries">
                        <a className={classes.btn}>
                        <span className={classes.span1}></span>
                        <span className={classes.span2}></span>
                        <span className={classes.span3}></span>
                        <span className={classes.span4}></span>
                        START
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    )
}