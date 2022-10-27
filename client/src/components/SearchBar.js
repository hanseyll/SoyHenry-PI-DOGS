import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);

  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(input));
    setCurrentPage(1)
    setInput("");

    // s
  }
  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
