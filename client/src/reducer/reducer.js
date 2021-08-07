//IMPORTO LAS CONSTANTES


import { SORT_BY_POPULATION,ACTIVITY_FILTER, CONTINENT_FILTER, GET_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, ORDER, POST_ACTIVITY} from "../actions/constants";

const initialState = {
    countriesLoaded: [],
    countriesFiltered: [],
    countryDetail: {},
     allActivities: [],
    activityPost:{},
    // loading: false
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:{
            return{
                ...state,
                countriesLoaded: action.payload, //trae todos los paises q trae la action GET_COUNTRIES
                countriesFiltered: action.payload //pq como se muestra en la pag principal, se filtran todos los paises
            }

        }
        case GET_COUNTRY_BY_NAME: {
            return{
                ...state,
                countriesFiltered: action.payload //devuelve todo lo obtenido por nombre
            }
        }
        case GET_COUNTRY_BY_ID: {
            return{
                ...state,
                countryDetail: action.payload
            }

        }
        case SORT_BY_POPULATION: {
            let sortPopulation;

            if(action.payload === "ASC"){
                sortPopulation= function(a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (a.population < b.population) {
                        return -1;
                    } else {
                    }
                    return 0;
                }
            }else{
                sortPopulation = function(a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (a.population < b.population) {
                        return 1;
                    } else {
                    }
                    return 0;
                }
            }
            let countriesByPopulation = state.countriesLoaded.sort(sortPopulation)
            return{
                ...state,
                countriesLoaded: countriesByPopulation
            }
        }
        
        case ORDER:{
            let actionPayload = action.payload.toUpperCase() //paso en mayuscula
           let orderAlfName;
         if( actionPayload === 'ASC'){
             orderAlfName = function(a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                } else {
                }
                return 0;
            }
             
         }else{
            orderAlfName = function(a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                } else {
                }
                return 0;
            }
        }
        let countriesByName = state.countriesLoaded.sort(orderAlfName)
        return{
            ...state,
            countriesFiltered: countriesByName
        }
             
         }
        
        case CONTINENT_FILTER:{
            const allCountries = state.countriesLoaded 
            let continentFilter= [];
            if(action.payload === "all"){
                continentFilter= allCountries
            }else{
                continentFilter = allCountries.filter(c => c.region === action.payload)
            }
            return{
                ...state,
                countriesFiltered: continentFilter
            }
        }
        case ACTIVITY_FILTER:{
            const countriesAll = state.countriesLoaded;
            let countriesFilterActivity = [];
            if (action.payload === "all") {
                countriesFilterActivity = countriesAll;
            } else {
                countriesFilterActivity = state.allActivities.filter(a => a.name === action.payload)[0].countries.map(countryAct => countryAct)
            }
            return{
                ...state,
                countriesFiltered: countriesFilterActivity      
            }
        }      
        case POST_ACTIVITY:{
            return{
                ...state,
                allActivities: [...state.allActivities, action.payload ],
                activityPost: action.payload
            }
        }
        default: return state
    }
}

export default rootReducer;