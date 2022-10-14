import React from "react";
import { Link } from "react-router-dom";
import homeIcon2 from "../utils/homeOutline.png";
import plusIcon from "../utils/plus.png";
import "../styles/Nav.css";
import SearchBar from "./SearchBar";

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
      <div className="nav-element ">
      <SearchBar/>
      </div>
    </div>
  );
};

export default Nav;
