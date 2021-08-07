import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../../actions/actions";

export default function CountryDetails(){
    const {id} = useParams();
    const countryDetail =  useSelector(e => e.countryDetail)
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getCountryById(id))
    }, [])

    return(
        <section>
            <section>
                <Link to='/countries'>
                    <button>VOLVER A HOME</button>
                    <div>{countryDetail?.name}</div>
                </Link>
            </section>

            <section>
                <div>
                    <img src={countryDetail?.flag} alt="Country Flag"/>
                </div>

                <div>
                    <div>
                        <div>ID: {countryDetail?.id}</div>
                        <div>CAPITAL:{countryDetail?.capital}</div>
                        <div>POBLACION:{countryDetail?.population}</div>

                    </div>
                    <div>
                        <div>CONTINENTE: {countryDetail?.region}</div>
                        <div>SUB REGION:{countryDetail?.subregion}</div>
                        <div>AREA:{countryDetail?.area}</div>
                        
                    </div>
                </div>
            </section>

            <section>
                <section>
                    ACTIVITIES:
                </section>

                <section>
                    {countryDetail?.activities?.length ?
                    countryDetail?.activities.map(a=>{
                        <div key={a.id}>
                            <p>{a.name}</p>
                            <p>Difficulty: {a.dificulty}</p>
                            <p>Duration: {a.duration} mins</p>
                            <p>Season: {a.season}</p>
                        </div>   
                    } ):
                        <p> NO HAY ACTIVIDADES PARA ESTE PAIS</p>
                    }
                </section>
            </section>
        </section>
    )
}