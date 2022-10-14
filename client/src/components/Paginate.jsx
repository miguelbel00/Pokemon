import React from "react";
import "../styles/Paginate.css";

const Paginate = ({ pokemonsAmount, pagination, currentPage }) => {
  let numberPages = [];
  let limitPages = Math.ceil(pokemonsAmount / 2) + 1;
  
  const syncPages = (currentPage) => {
    if (currentPage >= limitPages - 2 && limitPages >=5 ) {
      for (let j = 1; j <= 5; j++) {
        if (limitPages - 6 + j > 0) {
          numberPages.push(limitPages - 6 + j);
        }
      }
    } else if (currentPage >= 4) {
      for (let k = 1; k <= 5; k++) {
        numberPages.push(currentPage - 3 + k);
      }
    } else {
      for (let i = 1; i < limitPages; i++) {
        if (i === 5) {
          numberPages.push(i);
          break;
        }
        numberPages.push(i);
      }
    }
  };
  syncPages(currentPage);

  return (
    <nav className="paginate-container">
    <ul className="paginate-pages">
      <button onClick={() => pagination(1)}>First</button>
      {numberPages.map((number) => (
          <button key={number} className={number === currentPage ? "current-page" : "page"} onClick={() => pagination(number)}>
            {number}
          </button>
      ))}
      <button onClick={() => pagination(limitPages - 1)}>Last</button>
    </ul>
  </nav>
  );
};

export default Paginate;
