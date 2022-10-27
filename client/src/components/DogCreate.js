import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./css/DogCreate.css";
import { getDogs, postDog, getTemperaments } from "../actions/index";

function validate(e) {
  let error = {};

  if (e.name === null || e.name === "" || e.name === undefined)
    error.name = "Write a name, dont be an asshole";
  else if (!isNaN(e.name)) error.name = "Only text";
  else if (e.name.length > 30)
    error.name = "you have to write a name with maximum 30 letters";

  else if (typeof e.name === "string") {
    error.name = null;
  }

  if (e.height_min < 0 || e.height_min.includes("-"))
    error.height_min = "Write a valid number";
  else if (
    e.height_min === "" ||
    e.height_min === null ||
    e.height_min === undefined
  )
    error.height_min = "Write a minimum height";

  if (
    e.height_max === "" ||
    e.height_max === null ||
    e.height_max === undefined
  )
    error.height_max = "Write a maximum height";
  else if (Number(e.height_max) < 0) error.height_max = "Write a valid number";
  else if (Number(e.height_max) <  Number(e.height_min))
    error.height_max = "Maximum height have to be higher";
  else if (Number(e.height_max) > Number(e.height_min)) {
    error.height_max = null;
    error.height_min = null;
  }
  if (e.weight_min < 0) error.weight_min = "Write a valid number";
  else if (
    e.weight_min === "" ||
    e.weight_min === null ||
    e.weight_min === undefined
  )
    error.weight_min = "write a minimun weight";

  if (Number(e.weight_max) < 0) error.weight_max = "Write a valid number";
  else if (
    e.weight_max === "" ||
    e.weight_max === null ||
    e.weight_max === undefined
  )
    error.weight_max = "write a maximum weight";
  else if (Number(e.weight_max) < Number(e.weight_min))
    error.weight_max = "Maximum weight have to be heigher";
  else if (Number(e.weight_max) > Number(e.weight_min)) {
    error.weight_max = null;
    error.weight_min = null;
  }
  if (e.life_span < 0) error.life_span = "Write a valid number";
  else if (
    e.life_span === "" ||
    e.life_span === null ||
    e.life_span === undefined
  )
    error.life_span = "Write a life span";
  if (e.image.length > 0) {
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(e.image);
    if (!valid) error.image = "Write a correct URL";
    else{
      error.image =null;
    }
  }else if(e.image.length < 0){
    error.image='write a URL'
  }

  if (
    e.temperament.length === "" ||
    e.temperament.length === null ||
    e.temperament.length === 0
  )
    error.temperament = "you have to select at least one temperament";
  for (let i = 0; i < e.temperament.length; i++) {
    for (let y = i + 1; y <= e.temperament.length; y++) {
      if (e.temperament[i] === e.temperament[y])
        error.temperament = "you cant select same temperament again";
    }
  }

  return error;
}

function Form() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_span: '',
    temperament: [],
  });

  const [errors, setErrors] = useState({});
  const temps = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChangeheightMin(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      height_min: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        height_min: e.target.value,
      })
    );
  }

  function handleChangeheightMax(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      height_max: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        height_max: e.target.value,
      })
    );
  }

  function handleChangeweightMin(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      weight_min: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        weight_min: e.target.value,
      })
    );
  }

  function handleChangeweightMax(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      weight_max: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        weight_max: e.target.value,
      })
    );
  }

  function handleChangeLifeEstMin(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      life_span: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        life_span: e.target.value,
      })
    );
  }

  function handleChangeImage(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      image: e.target.value,
    }));

    setErrors(
      validate({
        ...input,
        image: e.target.value,
      })
    );
  }

  function handleChangeTemperaments(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      temperament: [...new Set([...input.temperament, e.target.value])],
    }));

    setErrors(
      validate({
        ...input,
        temperament: [...input.temperament, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    
    if (
      input.name &&
      input.height_min &&
      input.height_max &&
      input.weight_min &&
      input.weight_max &&
      input.life_span &&
      input.image &&
      input.temperament.length > 0 &&
      errors.name === null &&
      errors.weight_max === null &&
      errors.weight_min === null &&
      errors.height_max === null &&
      errors.height_min === null &&
      errors.image === null
    ) {
      input.name[0].toUpperCase();
      e.preventDefault();
      dispatch(postDog(input));
      alert("you have created a dog!");
      console.log(errors);

      setInput({
        name: "",
        image: "",
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperament: [],
      });

      history.push("/dogs");
    } else {
      e.preventDefault();
      alert("Wrong, you have to complete correctly form");
    }
  }

  function handleDeleteTemperament(e, temp) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      temperament: input.temperament.filter((e) => e !== temp),
    }));
  }

  return (
    <div className="form-container">
      <h1>Creating a breed</h1>
      <form autocomplete="off" className="" onSubmit={(e) => handleSubmit(e)}>
        {/*Nombre de la raza del perrito*/}
        <div className="part-container nameDog" >
          <label className="label-text">Dog's name </label>
          <input
            className="controls nameDog"
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
          <div className="part-container">
            <label className="label-text">Image </label>
            <input
              className="controls"
              type="text"
              value={input.image}
              name="image"
              placeholder="URL"
              onChange={(e) => handleChangeImage(e)}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
        </div>

        {/*Altura del perro*/}
        <div className="part-container">
          <label className="label-text">Height </label>
          <input
            className="controls"
            type="number"
            min="1"
            max="149"
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChangeheightMin(e)}
            placeholder="Minimum height"
          />
          {errors.height_min && <p className="error">{errors.height_min}</p>}

          <input
            className="controls"
            type="number"
            min="2"
            max="150"
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChangeheightMax(e)}
            placeholder="Maximum height"
          />
          {errors.height_max && <p className="error">{errors.height_max}</p>}
        </div>

        {/*Peso del perro*/}
        <div className="part-container">
          <label className="label-text">Weight</label>
          <input
            className="controls"
            type="number"
            min="1"
            max="149"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChangeweightMin(e)}
            placeholder="Minimun weight"
          />
          {errors.height_min && <p className="error">{errors.weight_min}</p>}

          <input
            className="controls"
            type="number"
            min="2"
            max="150"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChangeweightMax(e)}
            placeholder="Maximum weight"
          />
          {errors.weight_max && <p className="error">{errors.weight_max}</p>}
        </div>

        {/*Años de vida*/}
        <div className="part-container">
          <label className="label-text">Life Span </label>
          <input
            className="controls"
            type="number"
            min="1"
            max="50"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChangeLifeEstMin(e)}
            placeholder="Life span"
          />
          {errors.life_span && <p className="error">{errors.life_span}</p>}
        </div>

        {/*Select para añadir temperamentos*/}
        <div className="part-container">
          <label className="label-text">Temperaments</label>
          <select
            className="controls-temp"
            onChange={(e) => handleChangeTemperaments(e)}
          >
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
        <div className="part-container">
          <h3 className="add-temperament-h3">Current temeperaments</h3>
          <div className="container-temperament">
            {input.temperament.length !== 0
              ? input.temperament.map((temp, i) => (
                  <div key={i}>
                    <ul>
                      <li
                        className="li-temp"
                        onClick={(e) => handleDeleteTemperament(e, temp)}
                      >
                        <h3 className="font-h3">{temp}</h3>
                      </li>
                    </ul>
                  </div>
                ))
              : "No one..."}
          </div>
        </div>
        <div>
          <button className="botons" type="submit">
            Create
          </button>
        </div>
      </form>
      <Link className="container-back" to="/dogs">
        <button className="botonBack">Back </button>
      </Link>
    </div>
  );
}

export default Form;
