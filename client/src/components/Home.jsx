import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import pokeHome from '../utils/pokeHome.gif'

const Home = () => {

  return (
    <div className="home-container">
      <div className="home-body">
        <Link to={'/pokemon'}><img src={pokeHome}alt="PokeHome"/></Link>
      </div>
    </div>
  );
};

export default Home;
