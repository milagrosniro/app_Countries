import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../../actions/actions";
import classes from './countryDetails.module.css'

export default function CountryDetails() {
    const { id } = useParams();
    const countryDetail = useSelector(e => e.countryDetail)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryById(id))
    }, [])

    return (
        <section className={classes.countryDetails}>
            <section className={classes.nameSection}>
                <Link to='/countries'>
                    <div className={classes.countryName}>{countryDetail?.name}</div>
                    <button>VOLVER A HOME</button>
                </Link>
            </section>

            <section className={classes.middle}>
                <div className={classes.flag}>
                    <img className={classes.image} src={countryDetail?.flag} alt="Country Flag" />
                </div>

                <div className={classes.info}>
                    <div className={classes.infoLeftRight}>
                        <div className={classes.li}>ID: <span className={classes.data}>{countryDetail?.id} </span></div>
                        <div className={classes.li}>CAPITAL:<span className={classes.data}> {countryDetail?.capital}</span></div>
                        <div className={classes.li}>POBLACION:<span className={classes.data}> {countryDetail?.population} millones</span></div>

                    </div>
                    <div className={classes.infoLeftRight}>
                        <div className={classes.li}>CONTINENTE: <span className={classes.data}> {countryDetail?.region}</span></div>
                        <div className={classes.li}>SUB REGION:<span className={classes.data}> {countryDetail?.subregion} </span> </div>
                        <div className={classes.li}>AREA:<span className={classes.data}> {countryDetail?.area}</span> </div>

                    </div>
                </div>
            </section >


            <section className={classes.activities}>
                <section className={classes.titleActivities}>
                    ACTIVITIES:
                </section>

                <section className={classes.activities2}>

                    {countryDetail?.activities?.length ?
                        countryDetail?.activities.map(a => {
                            return (<div key={a.id} className={classes.activityCard}>
                                <p>{a.name}</p>
                                <p>Difficulty: {a.dificulty}</p>
                                <p>Duration: {a.duration} mins</p>
                                <p>Season: {a.season}</p>
                            </div>)
                        }) :
                        <p> NO HAY ACTIVIDADES PARA ESTE PAIS</p>
                    }
                </section>
            </section>
        </section>
    )
}