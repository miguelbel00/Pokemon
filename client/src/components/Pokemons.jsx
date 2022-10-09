import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import PokemonCard from "../components/PokemonCard";
import "../styles/Pokemons.css";

const Pokemons = () => {
  const dispatch = useDispatch();

  const pokemonsState = useSelector((state) => state.pokemons);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pokemonsState.length) {
      const syncPokemons = async () => {
        try {
          setLoading(true);
          await dispatch(actions.getAllPokemons());
          setLoading(false);
        } catch (error) {
          console.log(error)
        }
      };
      syncPokemons()

    } 
  }, []);

  return (
    <div className="pokemons-container">
      <div className="pokemons-cards">
        <PokemonCard loading={loading} pokemons={pokemonsState} />
      </div>
    </div>
  );
};

export default Pokemons;
