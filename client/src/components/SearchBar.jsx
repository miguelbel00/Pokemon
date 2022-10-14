import React, { useState } from "react";
import { useDispatch} from "react-redux";
import searchIcon from "../utils/search.png";
import * as actions from "../redux/actions";
import '../styles/SearchBar.css'

const SearchBar = () => {
  const [word, setWord] = useState("");
  const dispatch = useDispatch();

  const handleWord = (e) => {
    setWord(e.target.value);
  };
  const handleSearch = () => {
    return dispatch(actions.getPokemonSearch(word));
  };

  return (
    <div className="container-search">
      <div className="element-input">
        <input
          className="input-pokemon"
          type="text"
          placeholder="Pokemon..."
          value={word}
          onChange={handleWord}
        />
      </div>
      <div>
        <img
          className="img-nav"
          src={searchIcon}
          alt="Search Pokemon"
          onClick={handleSearch}
        />
        <br />
        Search
      </div>
    </div>
  );
};

export default SearchBar;
