import React from "react";
import { useHistory } from "react-router-dom";
import '../styles/Home.css'

const Home = () => {
  const history = useHistory()

  const redirectPokemons = (e) => {
    e.preventDefault()
    history.push('/pokemon')
  }



  return ( 
     <div className="home-container">
      
      <div className="home-body">
      <button onClick={redirectPokemons} className="btn-pokemons">See the Pokemons!!!</button>
      </div>



    </div>
  )

};

export default Home;
