import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  filterDogsByWeight,
  filterCreated,
  orderByName,
  filterByTemperament,
  getTemperaments,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import "./css/Home.css";
import imageNotFound from '../images/dogLost1.jpg'

export default function Home() {
  const [order, SetOrder] = useState("");
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //trae del reducer el estado dogs
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  let containerTemps = "e";

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  function orderByWeight(e) {
    e.preventDefault(e);
    dispatch(filterDogsByWeight(e.target.value));
    setCurrentPage(1);
    SetOrder(e.target.value);
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    SetOrder(`order ready${e.target.value}`);
  }

  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);

    console.log(currentDogs);
  }
  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    setCurrentPage(1);
    dispatch(filterByTemperament(e.target.value));
    containerTemps= containerTemps + " " + e.target.value
    console.log(containerTemps);
  }

  return (
    <div>
      <div className="topnav">
        <Link
          onClick={(e) => {
            handleClick(e);
          }}
          className="active"
          to="/dogs"
        >
          Home
        </Link>

        <Link to="/dogs/create-dogs">Create Dog</Link>
        <div className="search-container">
          <form action="/action_page.php">
            <SearchBar />
          </form>
        </div>
      </div>
        <div className="title-home">
        <h1>Dog world</h1>
        </div>
        
        <div class="box-1">
          <div onClick={(e) => handleClick(e)} class="btn btn-one">
            <span>Reload dogs</span>
          </div>
        </div>
        <div className="content-select">
          <div className="select">
            <select onChange={(e) => handleSort(e)}>
              <option value="DH">A-Z</option>
              <option value="asc">Ascendent</option>
              <option value="desc">Descendent</option>
            </select>
          </div>
          <div className="select">
            <select onChange={(e) => orderByWeight(e)}>
              <option value="all">order by weight</option>
              <option value="weight_max">Weight_max</option>
              <option value="weight_min">Weight_min</option>
            </select>
          </div>
          <div className="select">
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">All</option>
              <option value="created">Database</option>
              <option value="api">Api</option>
            </select>
          </div>
          <div className="select">
            <select onChange={(e) => handleFilterByTemperament(e)}>
              <option value="all">All Temperaments</option>
              <option value="all">Reset Temperaments</option>

              {allTemperaments.map((el) => {
                return (
                  <React.Fragment key={el}>
                    <option value={el}>{el}</option>
                  </React.Fragment>
                );
              })
              }
            </select>
          </div>
        </div>
        <div className="pos-card">
          {console.log(currentDogs)}
          {currentDogs?.map((c) => {
            return (
              <div>
                <Link to={"/dogs/" + c.id}>
                  <Card
                    name={c.name}
                    weight_min={c.weight_min}
                    weight_max={c.weight_max}
                    height_min={c.height_min}
                    height_max={c.height_max}
                    image={c.image}
                  />
                </Link>
                {/*  */}
              </div>
            );
          })}
        </div>
        <div>
          {currentDogs.length===0? <img src={imageNotFound}/>: console.log("Hay imagen") }

        </div>
        <Paginated
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginated={paginated}
          currentPage={currentPage}
        />
      
    </div>
  );
}
