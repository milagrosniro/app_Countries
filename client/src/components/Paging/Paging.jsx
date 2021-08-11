import {React} from 'react';



//ESTE COMPONENTE RENDERIZA LOS NUMEROS DE PAGINA

//traigo por parametro los paises q deben ir por pagina, el length de todos los paises filtados y el paged que setea el estado de paginado

export default function Paged({countriesPerPage, totalCountries, paginado}){
    const pageNumbers=[]

    for(let i=1; i<=Math.floor(totalCountries/countriesPerPage); i++){ //divido el total de paises filtrados por la cant de paises que debo mostrar por pagina, hago un for con el resultado y voy mostrando el numero de pagina
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                { pageNumbers &&
                  pageNumbers.map(number=>(
                      <li>
                          {/* renderizo cada numero que sera un link q me lleva a esa pagina */}
                          <a onClick={()=>paginado(number)}> 
                         {number} 
                      </a>
                      </li>
                  ) )}
            </ul>
        </nav>
    )
}