import React, { useState,useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';
import { getTemperaments, postDog } from "../actions";
import {useDispatch, useSelector} from 'react-redux';
export default function DogsCreate(){
    const dispatch = useDispatch();
    const history= useHistory();
    const temperaments = useSelector((state) => state.temperaments)
   const [input,setInput] = useState({
    name: "",
    height_min:"",
    height_max:"",
    weight_min:"",
    weight_max:"",
    life_span:"",
    image:"",
    temperament:[]

})

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value

    })
    console.log(input)
}

function handleSelect(e){
    setInput({
        ...input,
        temperament:[...input.temperament,e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    console.log(input)
    dispatch(postDog(input))
    alert("Dog created!")
    setInput({
        name: "",
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:"",
        life_span:"",
        image:"",
        temperament:[]
    })
    history.push('/home')
}



    useEffect(()=>{
        dispatch(getTemperaments())
    }, [])
    return(
        <div>
            <Link to= '/home'> <button>back </button></Link>
            <h1>Create a breed</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type='text' value={input.name} name='name' placeholder="Breed Name" onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Image</label>
                    <input placeholder="URL" value={input.image} name='image' onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Weight min</label>
                    <input type='number'
                    name='weight_min'
                    onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Weight max</label>
                    <input type='number'
                    name='weight_max'
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Height min</label>
                    <input type='number'
                    name='height_min'
                    onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Height max</label>
                    <input type='number'
                    onChange={(e) => handleChange(e)} name='height_max'
                    />
                </div>
                <div>
                    <label>LifeSpan</label>
                    <input type='text'
                   onChange={(e) => handleChange(e)} name='life_span'
                    />
                </div>

                <select onChange={handleSelect}>                    
                   {  
                       temperaments.map( el => {
                           return(
                            <React.Fragment key={el}>
                                       <option value={el}>{el}</option>    
                                       
                            </React.Fragment>               
                           )
                       })
                   }
                   </select>
                   <ul><li>{input.temperament.map(el => el + ",")} </li></ul>
                    <button type="submit">Create dog</button>
            </form>
        </div>
    )



}