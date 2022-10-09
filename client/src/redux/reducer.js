import * as actions from "./actions";

const initialState = {
  types: [],
  pokemons: [],
  filteredPokemons: [],
  pokemon: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
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
        filteredPokemons: filterAndOrganize(state.pokemons,action.payload),
      };
    default:
      return state;
  }
};

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
  feature === "Existing" &&
    (pokemons = pokemons.filter((p) => !p.id.includes("-")));

  feature === "Created" &&
    (pokemons = pokemons.filter(
      (p) => p.id.includes("-") && p.id.length === 36
    ));

  return pokemons;
};

const orderTypes = (pokemons, feature) => {
  return feature === "Type"
    ? pokemons
    : pokemons.filter((p) => p.types.includes(feature));
};
const orderName = (pokemons, feature) => {
  feature === "A-Z" && (pokemons = pokemons.sort());

  feature === "Z-A" && (pokemons = pokemons.reverse());

  return pokemons;
};
const orderAttack = (pokemons, feature) => {
  feature === "Descending" &&
    (pokemons = pokemons.sort((a, b) => {
      return a - b;
    }));
  feature === "Ascending" &&
    (pokemons = pokemons.sort((a, b) => {
      return b - a;
    }));
  return pokemons;
};

export default rootReducer;
