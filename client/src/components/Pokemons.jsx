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
          await dispatch(actions.setFilteredPokemons(pokemonsFiltersState))
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      syncPokemons();
    }

  }, []);




  return (
    <div className="pokemons-container">
      <div className="pokemons-tools">
        <div className="pokemons-options">
          <div className="pokemons-origin">
            <select className="origin">
              <option value="AllPokemons">AllPokemons</option>
              <option value="Existing">Existing</option>
              <option value="Created">Created</option>
            </select>
          </div>
          <div className="pokemons-type">
            <select className="type">
              {typesState?.map((t,i) =>{
                <option value={t.name}>AllPokemons</option>
              })}
              <option value="AllPokemons">AllPokemons</option>

            </select>
          </div>
        </div>
        <div className="pokemons-search"></div>
      </div>
      <div className="pokemons-cards">
        <PokemonCard loading={loading} pokemons={pokemonsState} />
      </div>
    </div>
  );
};

export default Pokemons;
