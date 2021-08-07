import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { sortAlf } from '../../actions/actions';
//React Hook "useState" is called in function "orderAlf" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter     react-hooks/rules-of-hooks
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
        <button onClick={(e)=>{handleOnClick(e)}}>ORDENAR ALFABETICAMENTE</button>
    )
}