import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import PokemonCard from "../components/PokemonCard";
import "../styles/Pokemons.css";


const Pokemons = () => {
  const dispatch = useDispatch();

  const pokemonsState = useSelector((state) => state.pokemonsFiltered);
  const pokemonsFiltersState = useSelector((state) => state.pokemonsFilters);
  const typesState = useSelector((state) => state.types);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pokemonsState.length) {
      const syncPokemons = async () => {
        try {
          setLoading(true);
          await dispatch(actions.getAllTypes());
          await dispatch(actions.getAllPokemons());
          await dispatch(actions.setFilteredPokemons(pokemonsFiltersState));
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      syncPokemons();
    }

    let syncFilters = () => {
      Object.values(pokemonsFiltersState).map((e) => {
        let element = document.getElementById(e);
        element?.setAttribute("selected", "selected");
      });
    };
    syncFilters();
  }, []);

  const handleFilter = (e) => {
    let newFilters = {
      ...pokemonsFiltersState,
      [e.target.className]: e.target.value,
    };
    dispatch(actions.setFilteredPokemons(newFilters));
  };
  const handleSearch = () => {
    //logic for search a pokemon
  };

  return (
    <div className="pokemons-container">
      <div className="pokemons-tools">
        <div className="pokemons-options">
          <div className="pokemons-origin">
            <select className="origin" onChange={handleFilter}>
              <option id="AllPokemons" value="AllPokemons">
                AllPokemons
              </option>
              <option id="Existing" value="Existing">
                Existing
              </option>
              <option id="Created" value="Created">
                Created
              </option>
            </select>
          </div>
          <div className="pokemons-type">
            <select className="orderTypes" onChange={handleFilter}>
              <option id="Type" value="Type">
                Type
              </option>
              {typesState?.map((t, i) => {
                return (
                  <option id={t.name} value={t.name} key={i + 1}>
                    {t.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="pokemons-name">
            <select className="orderName" onChange={handleFilter}>
              <option id="Name" value="Name">
                Name
              </option>
              <option id="A-Z" value="A-Z">
                A-Z
              </option>
              <option id="Z-A" value="Z-A">
                Z-A
              </option>
            </select>
          </div>
          <div className="pokemons-attack">
            <select className="orderAttack" onChange={handleFilter}>
              <option id="Attack" value="Attack">
                Attack
              </option>
              <option id="Ascending" value="Ascending">
                Ascending
              </option>
              <option id="Descending" value="Descending">
                Descending
              </option>
            </select>
          </div>
        </div>
        <div className="pokemons-search">
          <label>Pokemon: </label>
          <input type="text" />
        </div>
        <div className="pokemons-button">
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
      <div className="pokemons-cards">
        <PokemonCard loading={loading} pokemons={pokemonsState} />
      </div>
    </div>
  );
};

export default Pokemons;
