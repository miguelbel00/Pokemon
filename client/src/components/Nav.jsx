import React from "react";
import { Link } from "react-router-dom";
import homeIcon2 from "../utils/homeOutline.png";
import searchIcon from "../utils/search.png";
import plusIcon from "../utils/plus.png";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-element">
        <Link to="/">
          <img className="img-nav" src={homeIcon2} alt="homeIcon" />
        </Link>
        <br />
        Home
      </div>

      <div className="nav-element">
        <Link to="/pokemon/create">
          <img className="img-nav" src={plusIcon} alt="Create Pokemon" />
        </Link>
        <br />
        Create Pokemon
      </div>

      <div className="nav-element nav-element-search">
        <div className="element-input">
          <input className="input-pokemon" type="text" placeholder="Pokemon..." />
        </div>
        <div>
          <Link to="/pokemon/create">
            <img className="img-nav" src={searchIcon} alt="Search Pokemon" />
          </Link>
          <br />
          Search
        </div>
      </div>
    </div>
  );
};

export default Nav;
