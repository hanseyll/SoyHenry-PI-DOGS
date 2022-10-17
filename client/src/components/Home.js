import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterDogsByWeight,filterCreated, orderByName,filterByTemperament,getTemperaments } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import './css/Home.css'

export default function Home() {
  const [order , SetOrder] = useState('')
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);//trae del reducer el estado dogs
  const allTemperaments = useSelector((state) => state.temperaments)
  const [currentPage, setCurrentPage] =useState(1);
  const [dogsPerPage,setDogsPerPage] = useState(8)
  const indexOfLastDog = currentPage * dogsPerPage
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
  
  const paginated= (pageNumber) =>{
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    
  }
  function orderByWeight(e){
    e.preventDefault(e)
    dispatch(filterDogsByWeight(e.target.value))
    setCurrentPage(1)
    SetOrder(e.target.value)
    
}
function handleSort (e){
  e.preventDefault();
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  SetOrder(`order ready${e.target.value}`)
}

function handleFilterCreated(e){
  dispatch(filterCreated(e.target.value))
}
function handleFilterByTemperament (e){
  e.preventDefault(e)
  setCurrentPage(1)
  dispatch(filterByTemperament(e.target.value))
  SetOrder(e.target.value)

}

  return (
    <div>
<div class="topnav">
  <a class="active" href="#dogs">Home</a>
  <Link to="/dogs/create-dogs">Create Dog</Link>
  <div class="search-container">
    <form action="/action_page.php">
    <SearchBar/>
    </form>
  </div>
</div>
     
      <h1>Wait dogs</h1> 
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        reload all dogs
      </button>
      <div>
        <select onChange={e => handleSort(e)}>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select onChange={e => orderByWeight(e)}>
          <option value="all">order by weight</option>
          <option value="weight_max">Weight_max</option>
          <option value="weight_min">Weight_min</option>
        </select>
        <select onChange={e => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Exist</option>
        </select>
        <select onChange={e =>handleFilterByTemperament(e)}>
                    <option value ='all'>All Temperaments</option>
                    
                   {  
                       allTemperaments.map( el => {
                           return(
                            <React.Fragment key={el}>
                                       <option value={el}>{el}</option>    
                                       
                            </React.Fragment>               
                           )
                       })
                   }
                   </select>
                   
        
      
                 
     {currentDogs?.map((c) =>{
        return(
            <div>
                <Link to={"/dogs/" + c.id}>
                    <Card name={c.name} weight_min={c.weight_min} weight_max={c.weight_max} image={c.image} />
                
                </Link>
            </div>
        )
     })}


<Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginated= {paginated}
        />


      </div>
    </div>
  );
}
