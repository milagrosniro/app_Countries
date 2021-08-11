import React from 'react';
import {useDispatch} from 'react-redux';
import { orderByPopulation } from '../../actions/actions';

export default function SortPopulation({sortByPopulation, setSortByPopulation}){
     const dispatch = useDispatch();
    

     //renderizo un boton que inicializa con un estado "ASC", al hacer click despacho la acc de ordenar por poblacion con ese estado
     //y seteo el estado a DESC, que modifica el estado de countriesFiltered
    function handleOnClick(e){
        if(sortByPopulation === "ASC"){
            dispatch(orderByPopulation(sortByPopulation));
            return setSortByPopulation("DESC")
        }else{
            dispatch(orderByPopulation(sortByPopulation));
            return setSortByPopulation("ASC")
        }
    }

    return(
        <button onClick={(e)=>{handleOnClick(e)}} style={{margin: "2%"}}> Ordenar segun la Poblacion</button>
    )
}