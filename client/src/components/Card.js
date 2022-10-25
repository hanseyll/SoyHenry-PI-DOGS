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
        <p>{name}</p>
        <p>{weight_min} - {weight_max} Kg</p>
        <p> Temperaments</p>
        <p>{temperamentsApi}</p>
        <p>{temperamentsDB}</p>
        </div>
        </div> 
    )
}


