import React, { useState,useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';
import { getTemperaments, postDog } from "../actions";
import {useDispatch, useSelector} from 'react-redux';


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name= 'you have to write a name'
    }else if(!input.image){
        errors.image = 'you have to write a image'
    }
    return errors;
}


export default function DogsCreate(){
    const dispatch = useDispatch();
    const history= useHistory();
    const temperaments = useSelector((state) => state.temperaments)
    const [errors,setErrors] = useState({});
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
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
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
    history.push('/dogs')
}

function handleDelete(el){
    setInput({
        ...input,
        temperament: input.temperament.filter(temp => temp !== el)
    })
}



    useEffect(()=>{
        dispatch(getTemperaments())
    }, [])
    return(
        <div>
            <Link to= '/dogs'> <button>back </button></Link>
            <h1>Create a breed</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type='text' value={input.name} name='name' placeholder="Breed Name" onChange={(e) => handleChange(e)} required/>
                    {errors.name &&(
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Image</label>
                    <input placeholder="URL" value={input.image} name='image' onChange={(e) => handleChange(e)} ></input>
                </div>
                <div>
                    <label>Weight min</label>
                    <input type='number'
                    name='weight_min'
                    onChange={(e) => handleChange(e)} required />
                </div>
                <div>
                    <label>Weight max</label>
                    <input type='number'
                    name='weight_max'
                    onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <label>Height min</label>
                    <input type='number'
                    name='height_min'
                    onChange={(e) => handleChange(e)} required/>
                </div>
                <div>
                    <label>Height max</label>
                    <input type='number'
                    onChange={(e) => handleChange(e)} name='height_max'
                    required/>
                </div>
                <div>
                    <label>LifeSpan</label>
                    <input type='text'
                   onChange={(e) => handleChange(e)} name='life_span'
                   required />
                </div>

                <select onChange={handleSelect}>                    
                   {  
                       temperaments.map( el => {
                           return(
                            <React.Fragment key={el}>
                                        <input type='checkbox' ></input>
                                       <option value={el}>{el}</option>    
                                       
                            </React.Fragment>               
                           )
                       })
                   }
                   </select>
                   <ul><li>{input.temperament.map(
                    el => 
                    <div>
                        <p>{el}</p>
                        <div className="botonX" onClick={()=> handleDelete(el)}>x</div>
                    </div>
                   
                   )} </li></ul>


                    <button type="submit">Create dog</button>
            </form>
        </div>
    )



}