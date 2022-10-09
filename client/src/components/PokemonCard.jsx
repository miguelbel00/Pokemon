import React from "react";
import { Link } from "react-router-dom";
import '../styles/PokemonCard.css'

const PokemonCard = (props) => {
  if (props.loading) {
    return (

        <h1>CARGANDO ........</h1>

    )
  }

  return (

    <div className="cards-container">
        {props.pokemons?.map(poke=>(
          <div className="card" key={poke.id}>
              <div className="card-title">
                  <Link to={`/pokemon/detail/${poke.id}`}>{poke.name}</Link>
              </div>
              <div className="card-body">
              {/*   {console.log(poke.image)} */}
                <img src={poke.image} alt={poke.name} />
                <div className="card-types">
                  <p>Tipos: {poke.Types.map(p => p.name)}</p>
                </div>
                
              </div>


          </div>



        ))}



    </div>





  );
};

export default PokemonCard;
