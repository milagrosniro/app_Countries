import React from 'react';
import { useDispatch } from 'react-redux';
import { sortAlf } from '../../actions/actions';
//import classes from './order&filter.module.css'

export default function OrderAlf({order, setOrder}){

    
    const dispatch = useDispatch()

    function handleOnClick(e){
    if(order === "ASC"){
        dispatch(sortAlf(order))
        return setOrder("DESC");
    }else if(order === "DESC"){
        dispatch(sortAlf(order))
        return setOrder("ASC")
    }
    }

    return(
        <button onClick={(e)=>{handleOnClick(e)}} style={{marginLeft: "1%",
        borderRadius: "28px"}}>ORDENAR ALFABETICAMENTE
        
        </button>
    )
}