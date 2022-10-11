import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import Loading from "./Loading";

const PokemonDetail = (props) => {
  const loadingState = useSelector((state) => state.loading);
  const pokemonState = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    let syncPokemon = async () => {
      dispatch(actions.setLoading(true));
      await dispatch(actions.getPokemon(props.match.params.idPokemon));
      dispatch(actions.setLoading(false));
    };
    syncPokemon();
    return () => {
      dispatch(actions.getPokemon());
    };
  }, []);

  if (loadingState) {
    return <Loading />;
  }


  return (
    <div className="container-pokemon">  

      <p>{"Id: "+pokemonState.id}</p>
      <p>{"Health: "+pokemonState.health}</p>
      <p>{"Attack: "+pokemonState.attack}</p>
      <p>{"Defense: "+pokemonState.defense}</p>
      <p>{"Speed: "+pokemonState.speed}</p>
      <p>{"Height: "+pokemonState.height}</p>
      <p>{"Weight"+pokemonState.weight}</p>
      <img src={pokemonState.image} alt={pokemonState.name} />
      {/*  display my img by default 
      <img src= "http://localhost:3000/utils/pokemonEgg.png"alt={pokemonState.name} /> */}
      <p>{"Types: "+pokemonState.Types?.map(t => t.name)}</p>
      
    </div>


  );
};

export default PokemonDetail;
