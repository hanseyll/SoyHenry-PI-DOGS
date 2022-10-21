// import React, { useState,useEffect } from "react";
// import {Link, useHistory} from 'react-router-dom';
// import { getTemperaments, postDog } from "../actions";
// import {useDispatch, useSelector} from 'react-redux';
// import './css/DogCreate.css'


// function validate(input) {
//     let errors = {};
  
//     // NAME
//     if (!input.name) {
//       errors.name = "You must type a name";
//     } else {
      
//     }
  
//     // WEIGHTS
//     if (!input.weight_min) {
//       // weight min
//       errors.weight_min = "Type a valid minimal weight number";
//     } else if (!/\d{1,2}/gi.test(input.weight_min)) {
//       errors.weight_min = "Weight must have min values. Example: '25'";
//     } else {
//       errors.weight_min = "";
//     }
//     if (!input.weight_max) {
//       // weight max
//       errors.weight_max = "Type a valid maxim weight number";
//     } else if (!/\d{1,2}/gi.test(input.weight_max)) {
//       errors.weight_max = "Weight must have max values. Example: '25'";
//     } else {
//       errors.weight_max = "";
//     }
//     // HEIGHTS
//     if (!input.height_min) {
//       // height min
//       errors.height_min = "Type a valid minimal height number";
//     } else if (!/\d{1,2}/gi.test(input.height_min)) {
//       errors.height_min = "Height must have min values. Example: '25'";
//     } else {
//       errors.height_min = "";
//     }
//     if (!input.height_max) {
//       // height max
//       errors.height_max = "Type a valid maxim height number";
//     } else if (!/\d{1,2}/gi.test(input.height_max)) {
//       errors.height_max = "Height must have max values. Example: '25'";
//     } else {
//       errors.height_max = "";
//     }
//     return errors;
//   }
  

// export default function DogsCreate(){
//     const dispatch = useDispatch();
//     const history= useHistory();
//     const temperaments = useSelector((state) => state.temperaments)
//     const [errors,setErrors] = useState({});
//     const [input,setInput] = useState({
//     name: "",
//     height_min:"",
//     height_max:"",
//     weight_min:"",
//     weight_max:"",
//     life_span:"",
//     image:"",
//     temperament:[]

// })

// function handleChange(e){
//     setInput({
//         ...input,
//         [e.target.name] : e.target.value

//     })
//     setErrors(validate({
//         ...input,
//         [e.target.name]: e.target.value
//     }))
//     console.log(input)
// }

// function handleSelect(e){
//     setInput({
//         ...input,
//         temperament:[...input.temperament,e.target.value]
//     })
// }

// // function handleSubmit(e){
// //     e.preventDefault();
// //     console.log(input)
// //     dispatch(postDog(input))
// //     alert("Dog created!")
// //     setInput({
// //         name: "",
// //         height_min:"",
// //         height_max:"",
// //         weight_min:"",
// //         weight_max:"",
// //         life_span:"",
// //         image:"",
// //         temperament:[]
// //     })
// //     history.push('/dogs')
// // }

// function handleSubmit(e) {
//     e.preventDefault();
//     if (
//       !errors.name &&
//       !errors.image &&
//       !errors.weight_min &&
//       !errors.height_min &&
//       !errors.weight_max &&
//       !errors.height_max 
//     ) {
//       alert("Your dog has been created successfully");
//       console.log(errors.name)
//       dispatch(postDog(input));
//       setInput({
//         name: "",
//         image:"",
//         height_min: "",
//         weight_min: "",
//         height_max: "",
//         weight_max: "",
//         life_span: "",
//         temperament: [],
//       });
//     } else {
//       return alert("Something went wrong. Please try again.");
//     }
//     history.push("/dogs");
//   }



// function handleDelete(el){
//     setInput({
//         ...input,
//         temperament: input.temperament.filter(temp => temp !== el)
//     })
// }

//     useEffect(()=>{
//         dispatch(getTemperaments())
//     }, [])
//     return(
//         <div className="container">
//             <div className="header">
//             <h1>Create a breed</h1>
//             </div>
//             <div>

//             <form id="form" className="form" action="" onSubmit={(e) => handleSubmit(e)}>
//                 <div className="form-control">
//                     <label for="name">Name</label>
//                     <input type='text' value={input.name} id="name" name='name' placeholder="Breed Name" onChange={(e) => handleChange(e)} />
//                     {errors.name &&(
//                         <p className="error">{errors.name}</p>
//                     )}
//                 </div>
//                 <div className="form-control">
//                     <label for="image">Image</label>
//                     <input placeholder="URL" value={input.image} id="image" name='image' onChange={(e) => handleChange(e)} ></input>
//                 </div>
//                 <div className="form-control">
//                     <label for="weight_min">Weight min</label>
//                     <input type='number'
//                     id="weight_min"
//                     value={input.weight_min}
//                     name='weight_min'
//                     onChange={(e) => handleChange(e)}  />
//                 </div>
//                 <div className="form-control">
//                     <label for="weight_max">Weight max</label>
//                     <input type='number'
//                     id="weight_max"
//                     name='weight_max'
//                     value={input.weight_max}
//                     onChange={(e) => handleChange(e)} />
//                 </div>
//                 <div className="form-control">
//                     <label for="height_min">Height min</label>
//                     <input type='number'
//                     id="height_min"
//                     value={input.height_min}
//                     name='height_min'
//                     onChange={(e) => handleChange(e)} />
//                 </div>
//                 <div className="form-control">
//                     <label for="height_max">Height max</label>
//                     <input type='number'
//                     id="height_max"
//                     value={input.height_max}
//                     onChange={(e) => handleChange(e)} name='height_max'
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label for="life_span">LifeSpan</label>
//                     <input type='text'
//                      value={input.life_span}
//                     id="life_span"
//                    onChange={(e) => handleChange(e)} name='life_span'
//                     />
//                 </div>

//                 <select onChange={handleSelect}>
//                    {
//                        temperaments.map( el => {
//                            return(
//                             <React.Fragment key={el}>
//                                        <option value={el}>{el}</option>

//                             </React.Fragment>
//                            )
//                        })
//                    }
//                    </select>
//                    <ul><li>{input.temperament.map(
//                     el =>
//                     <div>
//                         <p>{el}</p>
//                         <div className="botonX" onClick={()=> handleDelete(el)}>x</div>
//                     </div>

//                    )} </li></ul>

//                     <button type="submit">Create dog</button>
//             </form>
//         </div>
//         <Link to= '/dogs'> <button>back </button></Link>
//         </div>
//     )

// }

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom' 
import './css/DogCreate.css'
import { getDogs, postDog, getTemperaments } from "../actions/index";


function validate(e){
  let error = {};

  if(e.name === null || e.name === "" || e.name === undefined) error.name = 'Write a name, dont be an asshole';
  else if(!isNaN(e.name)) error.name = 'Only text'

  if(e.height_min < 0 || e.height_min.includes("-")) error.height_min = "Write a valid number"
  else if(e.height_min === "" || e.height_min === null || e.height_min === undefined ) error.height_min = 'Write a minimum height'

  if(e.height_max === "" || e.height_max === null || e.height_max === undefined ) error.height_max = 'Write a maximum height'
  else if(e.height_max < 0 ) error.height_max = "Write a valid number"
  else if(e.height_max < e.height_min) error.height_max = 'Maximum height have to be higher'

  if(e.weight_min < 0 ) error.weight_min = "Write a valid number"
  else if(e.weight_min === "" || e.weight_min === null || e.weight_min === undefined ) error.weight_min = 'write a minimun weight'

  if(e.weight_max < 0 ) error.weight_max = "Write a valid number"
  else if(e.weight_max === "" || e.weight_max === null || e.weight_max === undefined ) error.weight_max = 'write a maximum weight'
  else if(e.weight_max < e.weight_min) error.weight_max = 'Maximum weight have to be heigher'

  
  if(e.life_span < 0 ) error.life_span = "Write a valid number"
  else if(e.life_span === "" || e.life_span === null || e.life_span === undefined ) error.life_span = 'Write a life span'
if(e.image.length > 0){
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(e.image);
    if( !valid) error.image = 'Write a correct URL'
}



  if(e.temperament.length === "" || e.temperament.length === null || e.temperament.length === 0) error.temperament = 'you have to select at least one temperament'
  for(let i = 0; i < e.temperament.length; i++){
    for(let y = i + 1; y <= e.temperament.length; y++){
      if(e.temperament[i] === e.temperament[y]) error.temperament = "you cant select same temperament again"
    }
  }

  return error
}

function Form() {
  const [input, setInput] = useState({
    name: "",
    image:"",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    yearOfLifeMax: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({});
  const temps = useSelector((state) => state.temperaments)
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments())
  }, [dispatch]);

  
  function handleChange(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value
    }))

    setErrors(validate({
      ...input, [e.target.name]: e.target.value
    }))
  }

  function handleChangeheightMin(e){
    e.preventDefault();
    setInput(input => ({
      ...input, height_min: e.target.value
    }))

    setErrors(validate({
      ...input, height_min: e.target.value
    }))
  }
  
  function handleChangeheightMax(e){
    e.preventDefault();
    setInput(input => ({
      ...input, height_max: e.target.value
    }))

    setErrors(validate({
      ...input, height_max: e.target.value
    }))
  }

  function handleChangeweightMin(e){
    e.preventDefault();
    setInput(input => ({
      ...input, weight_min: e.target.value
    }))

    setErrors(validate({
      ...input, weight_min: e.target.value
    }))
  }

  function handleChangeweightMax(e){
    e.preventDefault();
    setInput(input => ({
      ...input, weight_max: e.target.value
    }))

    setErrors(validate({
      ...input, weight_max: e.target.value
    }))
  }

  function handleChangeLifeEstMin(e){
    e.preventDefault();
    setInput(input => ({
      ...input, life_span: e.target.value
    }))

    setErrors(validate({
      ...input, life_span: e.target.value
    }))
  }

  function handleChangeImage(e){
    e.preventDefault();
    setInput(input => ({
      ...input, image: e.target.value
    }))

    setErrors(validate({
      ...input, image: e.target.value
    }))
  }

  function handleChangeTemperaments(e){
    e.preventDefault();
    setInput(input => ({
      ...input, temperament: [...new Set([...input.temperament, e.target.value])]
    }))
   
    setErrors(validate({
      ...input, temperament: [...input.temperament, e.target.value]
    }))
  }

  function handleSubmit(e){
    if (input.name && input.height_min && input.height_max && input.weight_min && input.weight_max && input.life_span && input.image && input.temperament.length > 0) {
      e.preventDefault();
      dispatch(postDog(input));
      alert("you have created a dog!");
      
      setInput({
        name: "",
        image:"",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: []
      });

     
      history.push("/dogs");
    } else {
      e.preventDefault();
      alert("Wrong, you have to complete form");
    }
  }

  function handleDeleteTemperament(e, temp){
    e.preventDefault();
    setInput((input)=> ({
      ...input, temperament: input.temperament.filter(e => e !== temp)
    }))
  }

  return (
    <div className="form-container">
      <h1>CREAR PERRO</h1>
      <form autocomplete="off" className="" onSubmit={(e)=> handleSubmit(e)}>

        {/*Nombre de la raza del perrito*/}
        <div className='algo'>
          <label className="label-text">Dog's name </label>
          <input
            className="controls"
            type="text"
            value={input.name}
            name="name"
            placeholder="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/*Image */}
        <div>
        <div className='algo'>
          <label className="label-text">Image </label>
          <input
            className="controls"
            type="text"
            value={input.image}
            name="image"
            placeholder="URL"
            onChange={(e) =>  handleChangeImage(e)}
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>


        </div>

        {/*Altura del perro*/}
        <div className='algo'>
          <label className="label-text">Height </label>
          <input className="controls" type="number" min="1" value={input.height_min} name="height_min" onChange={(e)=> handleChangeheightMin(e)} placeholder="Minimum height" />
          {errors.height_min && <p className="error">{errors.height_min}</p>}

          <input className="controls" type="number" min="1" value={input.height_max} name="height_max" onChange={(e)=> handleChangeheightMax(e)} placeholder="Maximum height" />
          {errors.height_max && <p className="error">{errors.height_max}</p>}
        </div>

        {/*Peso del perro*/}
        <div className='algo'>
          <label className="label-text">Weight</label>
          <input className="controls" type="number" min="1" value={input.weight_min} name="weight_min" onChange={(e)=> handleChangeweightMin(e)} placeholder="Minimun weight" />
          {errors.height_min && <p className="error">{errors.weight_min}</p>}

          <input className="controls" type="number" min="1" max="150" value={input.weight_max} name="weight_max" onChange={(e)=> handleChangeweightMax(e)} placeholder="Maximum weight" />
          {errors.weight_max && <p className="error">{errors.weight_max}</p>}
        </div>

        {/*Años de vida*/}
        <div className='algo'>
          <label className="label-text">Life Span </label>
          <input className="controls" type="number" min="1" value={input.life_span} name="life_span" onChange={(e)=> handleChangeLifeEstMin(e)} placeholder="Life span" />
          {errors.life_span && <p className="error">{errors.life_span}</p>}

        </div>

        {/*Select para añadir temperamentos*/}
        <div className='algo'>
          <label className="label-text">Temperaments</label>
          <select className="controls-temp" onChange={(e)=> handleChangeTemperaments(e)}>
            <option className="controls-temp" value="" hidden>
              Choose one or several
            </option>
            {temps.map((e) => (
              <option value={e} key={e}>
                 {`${e}`}
              </option>
            ))}
          </select>
          {errors.temperament && <p className="error">{errors.temperament}</p>}
        </div>

        {/*Lista de temperamentos*/}
        <div  className='algo'>
          <h3 className="add-temperament-h3">Current temeperaments</h3>
          <div className="container-temperament">
          {
            input.temperament.length !== 0 ? 
            input.temperament.map((temp, i) => (
              <div key={i}>
              <ul>
                    <li className="li-temp" onClick={(e)=> handleDeleteTemperament(e, temp)}>
                      <h3 className="font-h3">{temp}</h3>
                    </li>
              </ul>
              </div>
            )) : "No one..."
          }
          </div>
          
        </div>
        <div>
          <button className="botons" type="submit">Create</button>
        </div>
      </form>
      <Link to= '/dogs'> <button>back </button></Link>
    </div>
  );
}

export default Form;