import { Route } from "react-router-dom";
import Pokemons from './components/Pokemons';
import CreatePokemon from './components/CreatePokemon';
import PokemonDetail from './components/PokemonDetail';
import Home from './components/Home';
import Nav from './components/Nav';



function App() {
  return (
    <div>
      <Route exact path={"/"} component={Home} />
      <Route path={"/pokemon"} component={Nav} />
      <Route exact path={"/pokemon"} component={Pokemons} />
      <Route path={"/pokemon/detail/:idPokemon"} component={PokemonDetail} />
      <Route path={"/pokemon/create"} component={CreatePokemon} />


  </div>
  )
}

export default App;
