import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/PokemonCard.css";
import Loading from "./Loading";

const PokemonCard = (props) => {
  const loadingState = useSelector((state) => state.loading);
  if (loadingState) {
    return <Loading />;
  }

  return (
    <div className="cards-container">
      {
      props.pokemons?.map((poke) => (
        <div className="card" key={poke.id}>
          <div className="card-title">
            <Link  className="title" to={`/pokemon/detail/${poke.id}`}>{poke.name}</Link>
          </div>
          <div className="card-body">
            <img src={poke.image} alt={poke.name} /> 
            <div className="card-types">
              <p>
                 {poke.Types.map((p) => {
                  return p.name + "  ";
                }) 
              }
              </p>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default PokemonCard;
