import React from 'react';


export default function Prev({indexStart, setIndexStart, indexEnd, setIndexEnd, totalPages}){
 
    function handleOnclick(e){
        //si el num de indice es menor a 9 y el de finalr es menor a 18
        if(indexStart <= 9 && indexEnd <= 18){
            setIndexStart(0);
            return setIndexEnd(9)
        }
        setIndexStart(state => state - 9)
        setIndexEnd(state => state - 9)
    }

    return(
        <button onClick={(e)=>{handleOnclick(e)}}>ANTERIOR</button>
    )
}