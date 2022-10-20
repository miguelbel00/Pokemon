import React from "react";
import { Link } from "react-router-dom";
import homeIcon2 from "../utils/homeOutline.png";
import plusIcon from "../utils/plus.png";
import "../styles/Nav.css";
import SearchBar from "./SearchBar";
import * as actions from "../redux/actions";
import { useDispatch} from "react-redux";

const Nav = () => {
  const pokemonsFilters={
    origin: "AllPokemons",
    orderTypes: "Type",
    orderName: "Name",
    orderAttack: "Attack"
  }
  const dispatch = useDispatch()

  const handleClick =async () => {
    await dispatch(actions.getAllPokemons())
    await dispatch(actions.setFilteredPokemons(pokemonsFilters))
  }
  return (
    <div className="nav-container">
      <div className="nav-element">
        <Link to="/" onClick={handleClick}>
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
