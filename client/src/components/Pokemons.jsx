import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import PokemonCard from "../components/PokemonCard";
import "../styles/Pokemons.css";
import Paginate from "./Paginate";

const Pokemons = () => {
  const dispatch = useDispatch();

  const pokemonsState = useSelector((state) => state.pokemonsFiltered);
  const pokemonsFiltersState = useSelector((state) => state.pokemonsFilters);
  const typesState = useSelector((state) => state.types);
  const [currentePage, setCurrentPage] = useState(1)


  let nextPokemons = currentePage * 2
  let lastPokemons = nextPokemons - 2
  let actualPokemons = pokemonsState.slice(lastPokemons,nextPokemons)
  const pagination = (numberPage) => setCurrentPage(numberPage) 


  useEffect(() => {
    if (!pokemonsState.length) {
      const syncPokemons = async () => {
        dispatch(actions.setLoading(true));
        await dispatch(actions.getAllTypes());
        await dispatch(actions.getAllPokemons());
        await dispatch(actions.setFilteredPokemons(pokemonsFiltersState));
        dispatch(actions.setLoading(false));
      };
      syncPokemons();
    }
  }, []);

  useEffect(() => {
    let syncFilters = () => {
      Object.values(pokemonsFiltersState).map((e) => {
        let element = document.getElementById(e);
         element?.setAttribute("selected", "selected"); 
      });
    };
    syncFilters();
  },[pokemonsFiltersState])

  const handleFilter = (e) => {
    let newFilters = {...pokemonsFiltersState,[e.target.className]:e.target.value};
    dispatch(actions.setFilteredPokemons(newFilters));
  };

  return (
    <div className="pokemons-container">
        <div className="pokemons-options">
          Filters:&nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className="pokemons-name">
            <select className="orderName" onChange={handleFilter} >
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
          &nbsp;&nbsp;&nbsp;&nbsp;
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
      <div>
        <Paginate currentPage={currentePage} pokemonsAmount={pokemonsState.length} pagination={pagination}/>
      </div>
      <div className="pokemons-cards">
        <PokemonCard pokemons={actualPokemons} />
      </div>
    </div>
  );
};

export default Pokemons;
