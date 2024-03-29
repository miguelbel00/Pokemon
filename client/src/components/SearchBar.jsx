import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import searchIcon from "../utils/search.png";
import * as actions from "../redux/actions";
import '../styles/SearchBar.css'
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [word, setWord] = useState("");
  const pokemonsState = useSelector((state) => state.pokemonsFiltered);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleWord = (e) => {
    setWord(e.target.value ? e.target.value:e.target.id);
  };
  const handleSearch = () => {
    if (history.location.pathname !== "/pokemon") {
        history.push('/pokemon')
    }
     return dispatch(actions.getPokemonSearch(word));
  };

  return (
    <div className="container-search">
      <div className="element-input">
        <input className="input-pokemon" type="text" placeholder="Pokemon..." value={word} onChange={handleWord}
        />
        <div className="dropdown">
        {pokemonsState.filter(p => {
            let searchWord =  word?.charAt(0).toUpperCase() + word?.toLowerCase().slice(1);
            return searchWord && p.name.startsWith(searchWord) && p.name !== searchWord
        }).slice(0,5)
        .map(p => (
            <div key={p.id}onClick={handleWord} className="dropdown-row" id={p.name}>
                <img src={p.image}  alt={p.name} /> 
                {p.name}
            </div>
        ))}
        </div>
      </div>
      <div>
        <img className="img-nav" src={searchIcon} alt="Search Pokemon" onClick={handleSearch}/>
        <br />
        Search
      </div>
    </div>
  );
};

export default SearchBar;
