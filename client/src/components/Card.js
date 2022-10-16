import React from "react";
import dogHelp from '../images/dogLost1.jpg'
export default function Card({name,weight_min,weight_max,image}){
    if(weight_min!==null) weight_min= weight_min + " -";
   
    return(
        <div>
            <h3>{name}</h3>
            <h5>{weight_min}{weight_max}</h5>
            <img src={image?image:dogHelp} alt="img not found" width="200px" height="250px" ></img>
        </div> 
    )
}