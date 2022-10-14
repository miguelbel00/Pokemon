export const GET_POKEMON = "GET_POKEMON";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const SET_LOADING = "SET_LOADING";
export const SET_FILTEREDS_POKEMONS = "GET_FILTEREDS_POKEMONS";
export const GET_POKEMON_SEARCH = "GET_POKEMON_SEARCH";

const axios = require('axios')
/* export const SET_PAGE = "SET_PAGE"; */



export const getAllPokemons = ()=> (dispatch) => {

        return axios
          .get(`http://localhost:3001/pokemons`)
          .then((response) =>{
            dispatch({ type: GET_ALL_POKEMONS, payload: response.data })}
          ).catch(e => console.log(e.message));
      
};
export const getPokemon = (idPokemon) => (dispatch) => {
        if (!idPokemon) {
          return dispatch({ type: GET_POKEMON, payload: {} })
        }
        return axios
          .get(`http://localhost:3001/pokemons/${idPokemon}`)
          .then((response) =>
            dispatch({ type: GET_POKEMON, payload: response.data })
          );
      
};
export const createPokemon = (pokemon) => (dispatch) => {

        return axios
          .post(`http://localhost:3001/pokemons`,pokemon)
          .then((response) =>
            dispatch({ type: CREATE_POKEMON, payload: response.data })
          );
      
};
export const getAllTypes = ()=> dispatch => {

        return axios
          .get(`http://localhost:3001/types`)
          .then((response) =>
            dispatch({ type: GET_ALL_TYPES, payload: response.data })
          );
      
};
export const setFilteredPokemons = (filters) => (dispatch) => {
        return dispatch({ type: SET_FILTEREDS_POKEMONS, payload: filters })
          
      
};

export const setLoading = (data) => (dispatch) => {
  return dispatch({ type: SET_LOADING, payload: data })
}

export const getPokemonSearch = (word) => (dispatch) => {
  return dispatch({ type: GET_POKEMON_SEARCH, payload: word })
}


