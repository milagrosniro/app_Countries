import { GET_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_BY_ID, CONTINENT_FILTER, ACTIVITY_FILTER, ORDER, SORT_BY_POPULATION, GET_ALL_ACTIVITIES, ADD_ACTIVITY_COUNTRY} from "./constants.js";
const axios = require('axios');


//pido countries a la DB
export function getAllCountries(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries`)
        .then(countries =>{
            dispatch({type:GET_COUNTRIES, payload: countries.data})
        })
        
    }
}


// export function getAllCountries(){
//     return async function(dispatch){
//         let countries = await axios.get('http://localhost:3001/countries');
//         return dispatch({type:GET_COUNTRIES, payload: countries.data})
//     }
// }



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

// export function getCountryByName(name){
//     return async function(dispatch){
//         let countries= axios.get(`http://localhost:3001/countries?name=${name}`)
//         return dispatch({type: GET_COUNTRY_BY_NAME, payload: countries.data})
//     }
// }

//OBTENER PAIS SEGUN ID -DETALLES
export function getCountryById(idCountry){
    return  function(dispatch){
        return axios.get(`http://localhost:3001/countries/${idCountry}`)
        .then(country=>{
            dispatch({type: GET_COUNTRY_BY_ID, payload: country.data})
        })
    }
}

// export function getCountryById(idCountry){
//     return async function(dispatch){
//         let country = await axios.get(`http://localhost:3001/countries/${idCountry}`)
//         return dispatch({type:GET_COUNTRY_BY_ID, payload:country.data})
//     }
// }

//ORDENAR SEGUN POBLACION
export function orderByPopulation(payload){
        return function(dispatch) {
            return dispatch({
                type: SORT_BY_POPULATION,
                payload
            })
        }  
}
// export function orderByPopulation(payload){
//     return{type:SORT_BY_POPULATION, payload}
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

// export function sortAlf(payload){
//     return{type:ORDER, payload}
// }

//FILTRADO por CONTINENTE 
export function continentFilter(payload){
    return function(dispatch){
        return dispatch({
            type: CONTINENT_FILTER,
            payload
        })
    }
}

// export function continentFilter(payload){
//     return{type:CONTINENT_FILTER, payload}
// }


//FILTRADO por ACTIVIDAD, por nombre
export function activityFilter(payload){
    return function(dispatch){
        return dispatch({type: ACTIVITY_FILTER,
        payload
    })
}
}

// export function activityFilter(payload){
//     return{type:ACTIVITY_FILTER, payload}
// }

export function getAllActivities(){
    return function(dispatch){
        return axios.get('http://localhost:3001/activity')
        .then(getActivities=>{
            return dispatch({
                type: GET_ALL_ACTIVITIES,
                payload: getActivities.data
            })
        })
    }
}

// export function getAllActivities(){
//     return async function (dispatch){
//         let activities = await axios.get('http://localhost:3001/activity')
//         return dispatch({type:GET_ALL_ACTIVITIES, payload:activities.data})
//     }
// }


export function addActivityCountry(payload){ //le mando por payload al ActivityComplete
    return function(dispatch){
        return dispatch({
            type: ADD_ACTIVITY_COUNTRY,
            payload
        })
    }
}

// export function addActivityCountry(payload){
//     return{type:ADD_ACTIVITY_COUNTRY, payload}
// }
