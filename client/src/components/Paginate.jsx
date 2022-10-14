import React from "react";
import '../styles/Paginate.css'

const Paginate = ({ pokemonsAmount, pagination, currentPage }) => {
  let pageNumber = [];

  const syncPaginate = (number) => {
    if (number >= 4) {
        pageNumber = []
      for (let i = 1; i <= 5; i++) {
        console.log(i)

        pageNumber.push((number-3)+i);
      }
    } else {
      for (let i = 1; i < Math.ceil(pokemonsAmount / 2) + 1; i++) {
        if (i==5) {
            pageNumber.push(i);
            break
        }
        pageNumber.push(i);
      }
    }
    console.log(pageNumber)
  };

  syncPaginate(currentPage);
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => pagination(1)}>First</button>
        </li>

        {pageNumber.map((number) => (
          <li key={number}>
            <button className={number==currentPage ? "current-page":"page"} onClick={() => pagination(number)}>
              {number}
            </button>
          </li>
        ))}
        <button onClick={() => pagination(pageNumber[pageNumber.length - 1])}>
          Last
        </button>
      </ul>
    </nav>
  );
};

export default Paginate;
