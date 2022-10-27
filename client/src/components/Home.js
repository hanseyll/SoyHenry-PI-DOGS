import React from "react";
import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  filterDogsByWeight,
  filterCreated,
  orderByName,
  getTemperaments,
  filterByTemperament,
  deleteDog
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import "./css/Home.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [order, SetOrder] = useState("");
  const [tempShow, SetTempShow] = useState([]);
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //trae del reducer el estado dogs
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const [loading, setLoading] = useState(false);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getDogs());

    dispatch(getTemperaments());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
    SetOrder("");
    SetTempShow("");
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
    SetOrder(e.target.value);
  }
  function deleteDogs(e){
    e.preventDefault(e);
    dispatch(deleteDog(e.target.value))

    SetOrder(e.target.value);
  }

  function handleFilterCreated(e) {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    SetOrder(e.target.value);
    if (
      e.target.value === "api" ||
      e.target.value === "created" ||
      e.target.value === "all"
    ) {
      SetTempShow("");
    }
  }
  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    setCurrentPage(1);
    dispatch(filterByTemperament(e.target.value));
    if (
      e.target.value !== "all" &&
      e.target.value !== "weight_max" &&
      e.target.value !== "weight_min" &&
      e.target.value !== "desc" &&
      e.target.value !== "asc" &&
      e.target.value !== "DH" &&
      e.target.value !== "created" &&
      e.target.value !== "api"
    ) {
      if (!tempShow.includes(e.target.value)) {
        SetTempShow(tempShow + " " + e.target.value);
      }
    } else {
      SetTempShow("");
    }
  }

  return (
    <div className="container-home">
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
            <SearchBar setCurrentPage={setCurrentPage} />
          </form>
        </div>
      </div>
      <div className="title-home">
        <h1 className="title-main-h1">Dog App</h1>
      </div>

      <div className="box-1">
        <div onClick={(e) => handleClick(e)} className="btn btn-one">
          <span>Reload dogs</span>
        </div>
      </div>
      <div className="content-select">
        <div className="select">
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="all">All dogs</option>
            <option value="created">Database</option>
            <option value="api">Api</option>
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => handleSort(e)}>
            <option value="DH">Sort alphabetically</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div className="select">
          <select onChange={(e) => orderByWeight(e)}>
            <option value="all">Sort by weight</option>
            <option value="weight_max">Ascending: 0-9</option>
            <option value="weight_min">Descending: 9-0</option>
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
            })}
          </select>
        </div>
      </div>
      {tempShow ? (
        <div className="container-all-temperaments">
          <div className="container-p-temperaments">
            <p className="temperamentsShow">{tempShow}</p>
          </div>
        </div>
      ) : (
        "null"
      )}

      {allDogs.length === 0 && !loading ? (
        <div>
          <div className="title-error">
            <h1 className="title-error-h1">
              Doesn't exists any Dogs with temperaments you choose!
            </h1>
            <h1 className="title-error-h1">Reset temperaments!</h1>
          </div>
          <div className="container-img">
            <div className="back-img">
              <div className="box-1">
                <div onClick={(e) => handleClick(e)} className="btn2 btn-one">
                  <span>Back to home</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        console.log("Hay imagen")
      )}

      {loading ? (
        <div className="loader">
          <ClipLoader
            color={"#F27070"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : !loading? (
        <div className="pos-card">
          {console.log(currentDogs)}
          {currentDogs?.map((c) => {
            return (
              <div>
                <Link to={"/dogs/" + c.id} className="container-cards">
                  <Card
                    name={c.name}
                    weight_min={c.weight_min}
                    weight_max={c.weight_max}
                    height_min={c.height_min}
                    height_max={c.height_max}
                    image={c.image}
                    temperamentsApi={c.temperament}
                    temperamentsDB={
                      c.temperaments
                        ? c.temperaments.map((el) => el.name + ", ")
                        : console.log("ready")
                    }
                  />
                  
                </Link>
                {c.temperaments? <button className="deleteButton" value={c.name}  onClick={(e) => deleteDogs(e)}>delete</button>:''}
              </div>
            );
          })}
        </div>

      ) : console.log('loading...')}

      <div></div>
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginated={paginated}
        currentPage={currentPage}
      />
    </div>
  );
}

// const mapStateToProps = (state)=>{
//   return{
//     dogs: state.dogs
//   }
// }

// const mapDispatchToProps = (dispatch)=>{
//   return{
//     getDogs: ()=>dispatch(getDogs())
//   }
// }

// export default connect(mapStateToProps,{getDogs})(Home)

//props.getDogs()
