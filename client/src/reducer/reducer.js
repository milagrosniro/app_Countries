
import { SORT_BY_POPULATION,ACTIVITY_FILTER, CONTINENT_FILTER, GET_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, ORDER, POST_ACTIVITY, GET_ALL_ACTIVITIES, ADD_ACTIVITY_COUNTRY} from "../actions/constants";

const initialState = {
    countriesLoaded: [],
    countriesFiltered: [],
    countryDetail: {},
    allActivities: [],
    activityPost:{},
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
            }else {
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
            let countriesByPopulation = state.countriesFiltered.sort(sortPopulation)
            return{
                ...state,
                countriesFiltered: countriesByPopulation
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
        let countriesByName = state.countriesFiltered.sort(orderAlfName)
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
            const activity= state.allActivities.filter(a=>a.name===action.payload)[0].countries.map(countryWithActivity => countryWithActivity)
            return {
                     ...state,
                     countriesFiltered: activity
                    }
                 }
            
        
        
        case POST_ACTIVITY:{
            return{
                ...state,
                allActivities: [...state.allActivities, action.payload ],
                activityPost: action.payload
            }
        }

        case GET_ALL_ACTIVITIES:{
            return{
                ...state,
                allActivities: action.payload
            }
        }
        
        default: return state
    }
}

export default rootReducer;


// case ADD_ACTIVITY_COUNTRY:{
//     //filtro los paises que coinciden con el id enviado en la actividadCompleta
//     const countriesAddActiv = state.countriesLoaded.map(c =>{ if(c.id === action.payload.countryId){
//         c.activities=[...c.activities, action.payload]
//     }} ) 


    // return{
    //     ...state,

    // }