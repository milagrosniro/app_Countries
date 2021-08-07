import {React} from 'react';



//ESTE COMPONENTE RENDERIZA LOS NUMEROS DE PAGINA

//traigo por parametro los paises q deben ir por pagina, el length de todos los paises y el paged que setea el estado de paginado
export default function Paged({countriesPage, allCountriesLength, paged}){
    const pageNumbers = [];
    const totalPages = Math.floor(allCountriesLength/countriesPage)
    for(let i=0; i<totalPages; i++){
        pageNumbers.push(i+1); //se pusehan los numeros de paginas. hago i+1 para q empice desde el num 1
    } 
    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(num=>(
                    <li key={num}>
                        {/* //recorro el arreglo con el numero de paginas, cada vez q se haga un click en el link llamo a la funcion paged, para actualizar ese estado y renderizo el numero q me devuelve */}
                            <a onClick={()=>paged(num)}>{num}</a>
                    </li>
                ) 
                )}
            </ul>
        </nav>
    )
}