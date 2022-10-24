import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import imgDefault from "../images/dogLost1.jpg";
import "./css/Detail.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myDog = useSelector((state) => state.detail);

  // if(myDog[0].weight_min===null) myDog[0].weight_min= 0
  // if(myDog[0].weight_max===null) myDog[0].weight_max= 0
  // if(myDog[0].height_min===null) myDog[0].height_min= 0
  // if(myDog[0].height_max===null) myDog[0].height_max= 0;

  return (
    <div>
      {myDog.length > 0 ? (
        <div className="container-detail">
          <div className="item">
            <img
              id="imgDetail"
              src={myDog[0].image ? myDog[0].image : imgDefault}
             
            />
          </div>
          <div className="item" >
            <div className="container-all-data-details">
            <div className="container-title-details">
              <h1>I'm {myDog[0].name}</h1>
            </div>
            <div className="container-temperaments-details">
              <h2>Temperaments </h2>
              <p>
                {!myDog[0].createdInDB
                  ? myDog[0].temperament + " "
                  : myDog[0].temperaments.map((el) => el.name + " ")}
              </p>
            </div>
            <div className="container-data"></div>
            <div className="container-data-weight">
              <h2>Weight</h2>
              <p>
                {" "}
                {myDog[0].weight_min + " -"} {myDog[0].weight_max}
              </p>
            </div>
            <div className="container-data-height">
              <h2>Height </h2>
              <p>
                {" "}
                {myDog[0].height_min + " -"} {myDog[0].height_max}
              </p>
            </div>
            <div className="container-data-lifeSpan">
              <h2>LifeSpan </h2>
              <p>{myDog[0].life_span}</p>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}

      <Link to="/dogs">
      <div className="box-1">
         <div className="btn btn-one">
           <span>Back to home</span>
         </div>
       </div>
      </Link>
    </div>
  );
}
