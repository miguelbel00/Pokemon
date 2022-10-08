import './styles/App.css';
import { Route } from "react-router-dom";
import Pokemons from './components/Pokemons';
import CreatePokemon from './components/CreatePokemon';
import PokemonDetail from './components/PokemonDetail';
import Home from './components/Home';
import Nav from './components/Nav';





function App() {
  return (
    <>
    <Route path={"/"} component={Nav} />
    <Route exact path={"/"} component={Home} />
    <Route path={"/pokemons"} component={Pokemons} />
    <Route exact path={"/pokemon/create"} component={CreatePokemon} />
    <Route path={"/pokemon/:idPokemon"} component={PokemonDetail} />

  </>
  )
}

export default App;
