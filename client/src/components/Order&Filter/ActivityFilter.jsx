import React from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { activityFilter } from '../../actions/actions';

export default function ActivityFilter({activity, setActivity}){
    const dispatch = useDispatch();
    // const [activity, setActivity] = useState("all");
    const activities = useSelector(e => e.allActivities)

    function handleSelectChange(e){
        setActivity(e.target.value)
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(activityFilter(activity))
    }

    return(
        <section onSubmit={(e)=>{handleOnSubmit(e)}} >
            <label>FILTRAR POR ACTIVIDAD:
                <select value={activity} onChange={(e)=>{handleSelectChange(e)}}>
                    <option>Ninguno</option>
                    {activities?.length ?
                    activities?.map(a=> <option key={a.id} value={a.name}>{a.name}</option>):
                    <div value="all">NINGUNA ACTIVIDAD CREADA</div>}
                    
                </select>
            </label>
                <button type="submit" value="Submit">FILTRAR</button>
        </section>
    )
}