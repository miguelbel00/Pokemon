import React from "react";
import { Link } from "react-router-dom";
import homeIcon from '../utils/hogar.png'
import homeIcon2 from '../utils/homeOutline.png'
import searchIcon from '../utils/search.png'
import plusIcon from '../utils/plus.png'
import '../styles/Nav.css'

const Nav = () => {
  return (
  <div className="nav-container">
    <div className="nav-element">
    <Link to="/"><img className="img-nav" src={homeIcon2} alt="homeIcon" /></Link>
    <p>Home</p>
    </div>
    
    
    <div className="nav-element">
    <Link to="/pokemon/create"><img className="img-nav" src={plusIcon} alt="Create Pokemon" /></Link>
    <p>Create Pokemon</p>
    </div>
    
    <div className="nav-element">
      <input type="text" placeholder="Pokemon..."/>
    <Link to="/pokemon/create"><img className="img-nav" src={searchIcon} alt="Search Pokemon" /></Link>
    </div>
    
  </div>
  )
};

export default Nav;
