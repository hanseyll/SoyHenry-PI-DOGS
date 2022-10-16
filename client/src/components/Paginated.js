import React from "react";

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <li className="number" key={number}>
            <a onClick={() => paginated(number)}> {number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
