import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ActivityForm from '../ActivityForm/ActivityForm';
import SearchName from '../Order&Filter/SearchName';
import OrderAlf from '../Order&Filter/OrderAlf';
import SortPopulation from '../Order&Filter/SortPopulation';
import ActivityFilter from '../Order&Filter/ActivityFilter';
import ContinentFilter from '../Order&Filter/ContinentFilter';

//importar estilo

export default function Activity(){
    const countries = useSelector(e => e.countriesLoaded);
    console.log(countries)
    const [search, setSearch] = useState();
    const [order, setOrder] = useState("ASC");
    const [sortByPopulation, setSortByPopulation] = useState("ASC");
    const [continent, setContinent] = useState("all");
    const [activity, setActivity] = useState("all");
    const [activityPost, setActivityPost] = useState({
        name:"",
        dificulty: "",
        duration: "",
        season:"",
        countryId:[]
    })
    //  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", activityPost)

    //agrego el id del Pais sobre el q quiero agergar la activ
    function handleChooseButton(id) {
        setActivityPost({
            ...activityPost,
            countryId: [...activityPost.countryId, id]
        })
    }

    return(
        <section>
            <section>
                <section>

                <Link to="/countries">
                    <button>VOLVER A HOMER</button>
                </Link>
                </section>
                <section>
                    <h1>CREA UNA ACTIVIDAD</h1>
                </section>
            </section>

            <section>
                <section>
                    <div>
                        <ActivityForm activityPost={activityPost} setActivityPost={setActivityPost}/>
                    </div>
                </section>

            <section>
                <div>
                    <SearchName search={search} setSearch= {setSearch}/>
                    <OrderAlf order={order} setOrder={setOrder}/>
                    <SortPopulation sortByPopulation={sortByPopulation} setSortByPopulation={setSortByPopulation}/>
                    <ActivityFilter activity={activity} setActivity={setActivity}/>
                <ContinentFilter continent={continent} setContinent={setContinent}/>
                </div>

                <div>
                    <ul>
{/* recorro todos los paises y muestro su nombre con un boton para asociarlos a la activ */}
                    {countries?.length ? countries?.map(c=>
                    <div>
                    <li key={c.id}>
                        {c.name}
                        <button onClick={()=>{handleChooseButton(c.id)}}>AGREGAR</button>
                    </li>
                    </div>
                    ):
                    <li>Pais no encontrado</li>
                    }
                    </ul>
                </div>
            </section>
            </section>
        </section>
    )
}