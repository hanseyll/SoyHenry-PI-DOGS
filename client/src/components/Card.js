import React from "react";
import dogHelp from '../images/dogLost1.jpg'
import './css/Card.css'
export default function Card({name,weight_min,weight_max,height_min,height_max,image,temperamentsApi,temperamentsDB}){
    // if(weight_min!==null) weight_min= weight_min + " -";
    // if(height_min!==null) height_min= height_min + " -";
    if(weight_min===null) weight_min= "??"
    if(weight_max===null) weight_max= "??"
    if(height_min===null) height_min= "??"
    if(height_max===null) height_max= "??"
   
    return(
        <div className="card-container">
            <div className="container-img">
            <img src={image?image:dogHelp} alt="img not found" className="image" ></img>
            </div>
        <div className="container-text">
        <h3>{name}</h3>
        <h5>{weight_min} - {weight_max} Kg</h5>
        <h5> Temperaments</h5>
        <h3>{temperamentsApi}</h3>
        <h3>{temperamentsDB}</h3>
        </div>
        </div> 
    )
}



     {/* <div >
            <h3>{name}</h3>
            <h5>{weight_min} - {weight_max}</h5>
            <h5>{height_min} - {height_max}</h5>
            <img src={image?image:dogHelp} alt="img not found" width="200px" height="250px" ></img>
            </div> */}