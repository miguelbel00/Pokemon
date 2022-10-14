import * as actions from "./actions";

const initialState = {
  types: [],
  pokemons: [],
  pokemon: {},
  pokemonsFiltered: [],
  pokemonsFilters: {
    origin: "AllPokemons",
    orderTypes: "Type",
    orderName: "Name",
    orderAttack: "Attack"
  },
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case actions.GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case actions.GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case actions.SET_FILTEREDS_POKEMONS:
      return {
        ...state,
        pokemonsFiltered: filterAndOrganize(state.pokemons, action.payload),
        pokemonsFilters: action.payload
      };
    case actions.GET_POKEMON_SEARCH:
      return {
        ...state,
        pokemonsFiltered: 
        searchPokemon(state.pokemonsFiltered, action.payload,state.pokemons) === false 
        ? filterAndOrganize(state.pokemons, state.pokemonsFilters) 
        : searchPokemon(state.pokemonsFiltered, action.payload,state.pokemons)
      };
    default:
      return state;
  }
};

const searchPokemon= (pokemons,word) => {

  word =  word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);

  let resultSearch = pokemons.filter(p => p.name ===word)
  if (!resultSearch.length) {
    alert("Pokemon Not Found")
    return   false
  }
  return resultSearch
}



const filterAndOrganize = (pokemons, features) => {
  return orderAttack(
    orderName(
      orderTypes(
        originPokemons(pokemons, features.origin),
        features.orderTypes
      ),
      features.orderName
    ),
    features.orderAttack
  );
};

const originPokemons = (pokemons, feature) => {
  return feature === "Existing"
    ? pokemons.filter((p) => typeof p.id === "number")
    : feature === "Created"
    ? pokemons.filter((p) => typeof p.id === "string")
    : pokemons;
};

const orderTypes = (pokemons, feature) => {
  return feature === "Type"
    ? pokemons
    : pokemons.filter((p) => {
        if (p.Types.find((t) => t.name === feature)) return p;
      });
};
const orderName = (pokemons, feature) => {
  feature === "A-Z" &&
    pokemons.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

  feature === "Z-A" &&
    pokemons.sort((a, b) => {
      return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
    });
  return pokemons;
};
const orderAttack = (pokemons, feature) => {
  feature === "Descending" &&
    pokemons.sort((a, b) => {
      return a.attack < b.attack ? -1 : a.attack > b.attack ? 1 : 0;
    });
  feature === "Ascending" &&
    pokemons.sort((a, b) => {
      return a.attack > b.attack ? -1 : a.attack < b.attack ? 1 : 0;
    });

  return pokemons;
};

export default rootReducer;
