import rootReducer from './reducer.js'

describe('reducer', () => {
    it('Deberia retornar el estado inicial', () => {
      expect(rootReducer(undefined, {
        countriesLoaded: [],
        countriesFiltered: [],
        countryDetail: {},
        allActivities: [],
    })).toEqual({
        countriesLoaded: [],
        countriesFiltered: [],
        countryDetail: {},
        allActivities: [],
    })
    })


    it('deberia modificar el estado countriesFiltered cuando el action type es "CONTINENT_FILTER"', () => {
        const payload = 'Polar'
        
        expect(rootReducer({
            countriesLoaded: [],
            countriesFiltered: [{id:"ATA",
            name:"Antarctica",
            flag:"https://restcountries.eu/data/ata.svg",
            region:"Polar",
            population:1000}],
            countryDetail: {},
            allActivities: [],
        }, continentFilter(payload))).toEqual({
            countriesLoaded: [],
            countriesFiltered: [{id:"ATA",
            name:"Antarctica",
            flag:"https://restcountries.eu/data/ata.svg",
            region:"Polar",
            population:1000}],
            countryDetail: {},
            allActivities: [],
        })
      })
})