import { GET_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_BY_ID, SORT_BY_POPULATION_ASC, SORT_BY_POPULATION_DESC,  CONTINENT_FILTER, ACTIVITY_FILTER, ORDER, POST_ACTIVITY, SORT_BY_POPULATION} from "./constants.js";
const axios = require('axios');


//pido countries a la DB
export function getAllCountries(){
    return  function(dispatch){
        return axios.get(`http://localhost:3001/countries`)
        .then(countries =>{

            dispatch({type:GET_COUNTRIES, payload: countries.data})
        })
        
    }
}
// console.log(getAllCountries())
//BUSCAR COUNTRY POR NOMBRE-BARRA D EBUSQUEDA
//el search e sun filtrado mas

export function getCountryByName(name){
    return function(dispatch) {
        
            return axios.get(`http://localhost:3001/countries?name=${name}`)
            .then(country =>{

                dispatch({type: GET_COUNTRY_BY_NAME, payload: country.data}) //devuelve lo que devuelve la ruta  de back
            })
       
    }
};


//OBTENER PAIS SEGUN ID -DETALLES
export function getCountryById(idCountry){
    return  function(dispatch){
        return axios.get(`http://localhost:3001/countries/${idCountry}`)
        .then(country=>{

            dispatch({type: GET_COUNTRY_BY_ID, payload: country.data})
        })
    }
}

//ORDENAR SEGUN POBLACION
export function orderByPopulation(payload){
    
        return function(dispatch) {
            return dispatch({
                type: SORT_BY_POPULATION,
                payload
            })
        }
    
}
// export function sortByPopulationAsc(){
//     return function (dispatch){
//         type: SORT_BY_POPULATION_ASC,
//     }
// }

// export function sortByPopulationDesc(){
//     return {
//         type: SORT_BY_POPULATION_DESC,
//     }
// }


//ORDENAR ALFABETICAMENTE ASC
// export function sortAsc(){
//     return {
//         type: SORT_ALF_ASC,
//     }
// }
// export function sortDesc(){
//     return {
//         type: SORT_ALF_DESC,
//     }
// }
//ORDENAR ALFABETICAMENTE
export function sortAlf(payload) {
    return function(dispatch){

        return dispatch( {
            type: ORDER,
            payload
        })
    }
}

//FILTRADO por CONTINENTE 
export function continentFilter(payload){
    return function(dispatch){
        return dispatch({
            type: CONTINENT_FILTER,
            payload
        })
    }
}


//FILTRADO por ACTIVIDAD, por nombre
export function activityFilter(payload){
    return function(dispatch){
        return dispatch({type: ACTIVITY_FILTER,
        payload
    })
}
}

export function postActivity(payload){
    return  function(dispatch){
        return axios.post('http://localhost:3001/activity', payload)
        .then(postActivity=>{
            alert("Creaste una nueva ACtividad")
            return dispatch({
                type: POST_ACTIVITY,
                payload: postActivity.data
            })
        })
    }
}
