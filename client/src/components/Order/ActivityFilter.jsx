import React, {useEffect}from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { activityFilter, getAllActivities } from '../../actions/actions';
import classes from './order&filter.module.css'

export default function ActivityFilter({activity, setActivity}){
    const dispatch = useDispatch();
    const countries = useSelector(e => e.countriesFiltered) //paises filtrados
   // console.log("paises", countries)
    const allActivities = useSelector(state => state.allActivities)
    // console.log(activities)
    
    

    
    useEffect(() => {
        dispatch(getAllActivities())
        
    }, [])

    // function handleSelectChange(e){
    //     setActivity(e.target.value)
    //     console.log(activity)
    // }

    // function handleOnSubmit(e){
    //     e.preventDefault();
    //     dispatch(activityFilter(activity))
    // }
    function handleFilterActivity(e){
        dispatch(activityFilter(e.target.value))
        //console.log(dispatch(activityFilter(e.target.value)))
    }
   

    return(

        <section>
            <select onChange={e=>handleFilterActivity(e)}>
                {allActivities?.length &&
                    allActivities.map(a=>{return(
                        <option key={a.id} value={a.name}>{a.name}</option>
                    )})

                    }  
               
   
                    
                </select>
        </section>
    //     <section value={activity} onSubmit={(e)=>{handleOnSubmit(e)}}
    //    style={{padding:"2%", textAlign:"center", width:"80%"}}>
    //         <label style={{margin:"1%"}}>FILTRAR POR ACTIVIDAD:
               
    //             <select value={activity} onChange={(e)=>{handleSelectChange(e)}}
    //             style={{marginLeft:"2%"}}
    //             >

    //                 {activities?.length &&
    //                 activities?.map(a=>{return(
    //                     <option key={a.id} value={a.name}>{a.name}</option>
    //                 )})

    //                 }

                    
    //             </select>
    //         </label>
    //             {/* <button type="submit" value="Submit"  style={{marginLeft: "1%",
    // borderRadius: "28px"}}>FILTRAR</button> */}
    //     </section>
    )
}