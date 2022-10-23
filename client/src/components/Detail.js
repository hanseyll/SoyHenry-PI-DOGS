import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import imgDefault from '../images/dogLost1.jpg'

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getDetail(props.match.params.id))
        
    },[dispatch])

    const myDog = useSelector((state) => state.detail)

    return(
        <div>
            {
                myDog.length > 0 ?
                <div>
                    <h1>I'm {myDog[0].name}</h1>
                    <img src={myDog[0].image? myDog[0].image : imgDefault} width="500px" height="700px"/>
                    <h2>Temperaments: {!myDog[0].createdInDB? myDog[0].temperament + ' ' : myDog[0].temperaments.map(el => el.name + (' '))} </h2>
                    <h2>Weight: {myDog[0].weight_min} -  {myDog[0].weight_max}</h2>
                    <h2>Height: {myDog[0].height_min} -  {myDog[0].height_max}</h2>
                    <h2>LifeSpan: {myDog[0].life_span}</h2>
                </div>
           : <p>loading...</p> }

           <Link to='/dogs'>
            <button>back</button>
           </Link>
        </div>
    )
}
