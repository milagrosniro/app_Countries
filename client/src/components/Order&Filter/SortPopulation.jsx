import React from 'react';
import {useDispatch} from 'react-redux';
import { orderByPopulation } from '../../actions/actions';

export default function SortPopulation({sortByPopulation, setSortByPopulation}){
     const dispatch = useDispatch();
    // const [sortByPopulation, setSortByPopulation] = useState("ASC");

    function handleOnClick(e){
        if(sortByPopulation === "ASC"){
            dispatch(orderByPopulation());
            return setSortByPopulation("DESC")
        }else{
            dispatch(orderByPopulation());
            return setSortByPopulation("ASC")
        }
    }

    return(
        <button onClick={(e)=>{handleOnClick(e)}} > Ordenar segun la Poblacion</button>
    )
}