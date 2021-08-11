import React from 'react';


export default function Next({indexStart, setIndexStart, indexEnd, setIndexEnd}){

    function handleOnclick(e){
        if(indexStart <249){    
                setIndexStart(state => state + 9)
                setIndexEnd(state => state + 9)  
        }
    }
    return(
        <button onClick={(e)=>{handleOnclick(e)}}>SIGUIENTE</button>
    )
}