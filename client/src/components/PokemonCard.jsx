import React from "react";
import { Link } from "react-router-dom";
import "../styles/PokemonCard.css";
import pokemonEgg from "../utils/pokemonEgg.png";

const PokemonCard = (props) => {
  if (props.loading) {
    return <h1>CARGANDO ........</h1>;
  }

  return (
    <div className="cards-container">
      {props.pokemons?.map((poke) => (
        <div className="card" key={poke.id}>
          <div className="card-title">
            <Link to={`/pokemon/detail/${poke.id}`}>{poke.name}</Link>
          </div>
          <div className="card-body">
            {poke.image === "../utils/pokemonEgg.png" ? (
              <img src={pokemonEgg} alt={poke.name} />
            ) : (
              <img src={poke.image} alt={poke.name} />
            )}
            <div className="card-types">
              <p>Tipos: {poke.Types.map((p) => p.name)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCard;
