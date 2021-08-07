//ORDENAR POR POBLACION ASCENDENTEMENTE
export const orderPopulationAsc = (a,b) =>{ 
        return a.population - b.population  
}

//ORDENAR ALFABETICAMENTE DE LA A -Z
export const orderCountriesAlf = (a,b)=>{   
 if(a.name > b.name) {return 1; }
           if(b.name > a.name) {
               return -1;
           }
           return 0;
           
       }

