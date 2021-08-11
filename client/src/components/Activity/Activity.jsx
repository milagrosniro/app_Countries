import React, {useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import ActivityForm from '../ActivityForm/ActivityForm';
import { getCountryByName } from '../../actions/actions';

// import styled from "styled-components";




//importar estilo

export default function Activity(){
    const dispatch = useDispatch()
    const countrieByName = useSelector(e => e.countriesFiltered);
    const [name, setName] = useState("")

    // const [search, setSearch] = useState();
    // const [order, setOrder] = useState("ASC");
    // const [sortByPopulation, setSortByPopulation] = useState("ASC");
    // const [continent, setContinent] = useState("all");
    // const [activity, setActivity] = useState("all");

    useEffect(() => {
       dispatch(getCountryByName(name))
    }, [name])

    const [activityPost, setActivityPost] = useState({
        name:"",
        dificulty: "",
        duration: "",
        season:"",
        countryId:[] //hacer una manera que se una el countryId al
    })
   

    //agrego el id del Pais sobre el q quiero agergar la activ
    function handleChooseButton(id) {
        
        setActivityPost({
            ...activityPost,
            countryId: [...activityPost.countryId, id]
        })
        setName("")
    }

    function handleNameChange(e) {
        setName(e.target.value);  
      }

    return(
        // PAGE SECTION
        <section style={{ display:"flex", height: "100vh", flexDirection:"column"}}>
            
            {/* TOP SECTION */}
            <section style={{alignItems:"center", display:"flex", flexDirection:"row", height:"100vh", justifyContent:"space-around", marginBottom:"1%"}}>
              
                {/* TOP SECTION LEFT */}
                <section>

                {/* VOLVER A HOME */}
                <Link to="/countries" style={{color:"black", margin:"1%", textDecoration:"none"}}>
                    <button style={{fontSize:"1rem"}}>VOLVER A HOME</button>
                </Link>
                </section>

                {/* TOP SECTION RIGHT */}
                <section style={{width:"100vh"}}>
                    <span style={{fontSize:"2rem", textAlign:"end", display:"flex"}}>CREA UNA ACTIVIDAD</span>
                </section>
            </section>

            {/* MIDDLE SECTION */}
            <section style={{display:"flex", height:"80vh", justifyContent:"space-around", textAlign:"center"}}>
                
                {/* MIDDLE SECTION LEFT */}
                <section style={{alignContent:"center", alignItems:"center", display:"flex", flexDirection:"column", flexWrap:"nowrap", justifyContent:"center", width:"90vh"}}>

                {/* CREATE DIV ACTIVITY */}
                    <div style={{alignItems:"center", backgroundColor:"#EDFFD9", borderRadius:"0 20px 0 20px", display:"flex", flexDirection:"column", flexWrap:"nowrap", height:"100%", justifyContent:"center",
                marginBottom:"2%", width:"100%"}}>

                        <ActivityForm activityPost={activityPost} setActivityPost={setActivityPost}/>
                    </div>
                </section>

            {/* MIDDLE SECTION RIGHT */}
            <section style={{display:"flex", flexDirection:"column", justifyContent:"center", width:"90vh"}}>
                {/* FILTERS DIV */}
                <div style={{alignItems:"center", backgroundColor: "#EDFFD9", borderRadius:"20px 0 0", display:"flex", flexDirection:"column", height:"40vh", justifyContent:"center"}}>

                </div>
                </section>

            {/* COUNTRIES DIV */}
           
                <section>
                    
                </section>
                </section>

                <div className="input-cont">
        
        <input
          placeholder="Search by name..."
          autoComplete="off"
          value={name}
          type="text"
          onChange={(e) => handleNameChange(e)}
        ></input>

        {/* {countrieByName && countrieByName?.map(c =>  <span key={c.id}>{c.name} 
            <button onClick={()=>{handleChooseButton(c.id)}}
                        style={{marginLeft:"5px", backgroundColor:"#EDFFD9"}}>AGREGAR</button>
        </span>)} */}

        
      </div>
                    {/* STYLEDULLIST */}
                    <p style={{columns: "3",textAlign: "justify"}}>

                    <div>

                    <ul style={{backgroundColor:"#EDFFD9", borderRadius:"0 20px", height:"40vh", listStyle:"none", overFlow:"hidden", overFlowY:"scroll"}}>
{/* recorro todos los paises y muestro su nombre con un boton para asociarlos a la activ */}
                    {countrieByName ? countrieByName?.map(c=>
                    <div >
                        {/* STYLED ITEM */}
                        <span>

                    <li key={c.id} style={{margin:"5px"}}>
                        {c.name}
                        <button onClick={()=>{handleChooseButton(c.id)}}
                        style={{marginLeft:"5px", backgroundColor:"#EDFFD9"}}>AGREGAR</button>
                    </li>
                        </span>
                    </div>
                    ):
                    <li>Pais no encontrado</li>
                    }
                    </ul>
                    </div>
                    </p>
                
            
            
            
        </section>
    )
}




{/* <SearchName search={search} setSearch= {setSearch}/>
<OrderAlf order={order} setOrder={setOrder}/>
<SortPopulation sortByPopulation={sortByPopulation} setSortByPopulation={setSortByPopulation}/>
<ActivityFilter activity={activity} setActivity={setActivity}/>
<ContinentFilter continent={continent} setContinent={setContinent}/> */}