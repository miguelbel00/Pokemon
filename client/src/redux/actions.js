export const GET_POKEMON = "GET_POKEMON";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const SET_LOADING = "SET_LOADING";
export const SET_FILTEREDS_POKEMONS = "GET_FILTEREDS_POKEMONS";
export const GET_POKEMON_SEARCH = "GET_POKEMON_SEARCH";
const serverBack = "https://backpokemon.up.railway.app"
const axios = require('axios')



export const getAllPokemons = ()=> (dispatch) => {

        return axios
          .get(`${serverBack}/pokemons`)
          .then((response) =>{
            dispatch({ type: GET_ALL_POKEMONS, payload: response.data })}
          ).catch(e => console.log(e.message));
      
};
export const getPokemon = (idPokemon) => (dispatch) => {
        if (!idPokemon) {
          return dispatch({ type: GET_POKEMON, payload: {} })
        }
        return axios
          .get(`${serverBack}/pokemons/${idPokemon}`)
          .then((response) =>
            dispatch({ type: GET_POKEMON, payload: response.data })
          );
      
};
export const createPokemon = (pokemon,image) => (dispatch) => {

  return  axios.post(`${serverBack}/pokemons`,{...pokemon,image} )
          .then((response) =>
            dispatch({ type: CREATE_POKEMON, payload: response.data })
          ).catch(e => console.log(e.message)); 
 
};
export const getAllTypes = ()=> dispatch => {

  return axios.get(`${serverBack}/types`)
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

export const uploadImage = async(pokemon) =>   {

  const form = new FormData()
  form.append('imagePokemon',pokemon.image)
  let promiseResolved = await axios.post(`${serverBack}/pokemons/image`,form)
  return promiseResolved
}