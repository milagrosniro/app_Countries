import React from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { activityFilter } from '../../actions/actions';
import classes from './order&filter.module.css'

export default function ActivityFilter({activity, setActivity}){
    const dispatch = useDispatch();
    //console.log(activity)
    const activities = useSelector(e => e.allActivities)

    function handleSelectChange(e){
        setActivity(e.target.value)
        console.log(activity)
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(activityFilter(activity))
        console.log("SE DESPACHO LA FUNCION DE FILTRADO")
    }

    return(
        <section onSubmit={(e)=>{handleOnSubmit(e)}}
       style={{padding:"2%", textAlign:"center", width:"80%"}}>
            <label style={{margin:"1%"}}>FILTRAR POR ACTIVIDAD:
               
                <select value={activity} onChange={(e)=>{handleSelectChange(e)}}
                style={{marginLeft:"2%"}}
                >
                    <option>Ninguno</option>
                    
                    {activities?.length ?
                    activities?.map(a=> <option key={a.id} value={a.name}>{a.name}</option>):
                    
                    <div value="all">NINGUNA ACTIVIDAD CREADA</div>}
                    
                </select>
            </label>
                <button type="submit" value="Submit"  style={{marginLeft: "1%",
    borderRadius: "28px"}}>FILTRAR</button>
        </section>
    )
}