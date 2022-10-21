import React from "react";
import './css/Paginated.css'

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="center">
      <div className="pagination">
      {/* <a href="#">&laquo;</a> */}
        {pageNumbers?.map((number) => (
          
            <a onClick={() => paginated(number)}> {number}</a>
         
        ))}
        {/* <a href="#">&raquo;</a> */}
      </div>
    </div>
  );
}
