import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import Loading from "./Loading";
import "../styles/PokemonDetail.css";

const PokemonDetail = (props) => {
  const loadingState = useSelector((state) => state.loading);
  const pokemonState = useSelector((state) => state.pokemon);

  let dispatch = useDispatch();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingState) {
    return <Loading />;
  }

  return (
    <div className="container-pokemon">
      <div className="pokemon-detail">
        <h3>{pokemonState.name}</h3>
        <div className="pokemon-detail-image">
          <img src={pokemonState.image} alt={pokemonState.name} />
        </div>
        <div className="pokemon-body">
          <p>{"Id: " + pokemonState.id}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Health: " + pokemonState.health}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Attack: " + pokemonState.attack}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Defense: " + pokemonState.defense}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Speed: " + pokemonState.speed}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Height: " + pokemonState.height}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Weight: " + pokemonState.weight}</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p>{"Types: " + pokemonState.Types?.map((t) => t.name)}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
