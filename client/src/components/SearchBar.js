import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [input, setInput] = useState("");

    function handleInputChange(e){
    setInput(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(input))
        setInput("");

       // s
        
        
       
        
    }
    return(
        <div>
            <input type='text' value={input} placeholder="Search..." onChange={(e) => handleInputChange(e) }/>
            <button type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}