import React,{useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import * as actions from '../redux/actions'
import pokemonEgg from "../utils/pokemonEgg.png";


const PokemonDetail = (props) => {

  const pokemonState = useSelector((state) => state.pokemon)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(actions.getPokemon(props.match.params.idPokemon))

  }, []);



  return (
    <div className="container-pokemon">  

      <p>{"Id: "+pokemonState.id}</p>
      <p>{"Health: "+pokemonState.health}</p>
      <p>{"Attack: "+pokemonState.attack}</p>
      <p>{"Defense: "+pokemonState.defense}</p>
      <p>{"Speed: "+pokemonState.speed}</p>
      <p>{"Height: "+pokemonState.height}</p>
      <p>{"Weight"+pokemonState.weight}</p>
      {pokemonState?.image == "../utils/pokemonEgg.png"
       ?  <img src={pokemonEgg} alt="pokemonImage"/>
        : <img src={pokemonState.image} alt="pokemonImage"/>
    }
      <p>{"Types: "+pokemonState.Types?.map(t => t.name)}</p>
      
    </div>


  );
};

export default PokemonDetail;
