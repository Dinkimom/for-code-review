import { Dispatch } from 'react';
import req from '../utils/request';
import { ITypeRequest } from '../interface/pokemons';
import { ConfigServerType, ConfigEndpoint } from '../config';
import { IStateRequest } from '../interface';

export enum PokemonsActionTypes {
  FETCH_TYPES = 'FETCH_TYPES',
  FETCH_TYPE_RESOLVE = 'FETCH_TYPE_RESOLVE',
  FETCH_TYPE_REJECT = 'FETCH_TYPE_REJECT',
  CHOOSE_POKEMON = "CHOOSE_POKEMON",
}

interface TypeActions {
  type: PokemonsActionTypes;
  payload?: string[];
}

type ActionTypes = TypeActions;

const initialState: IStateRequest = {
  isLoading: false,
  data: {
    total: 0,
    pokemons: [],
  },
  error: null,
};

const pokemons = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonsActionTypes.FETCH_TYPES:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      };
    case PokemonsActionTypes.FETCH_TYPE_RESOLVE:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case PokemonsActionTypes.FETCH_TYPE_REJECT:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    
      case PokemonsActionTypes.CHOOSE_POKEMON:
        return {
          ...state,
         choosenPokemon: action.payload
        };
    default:
      return state;
  }
};

export const getTypesAction = (query = {}) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PokemonsActionTypes.FETCH_TYPES });
  try {
    const response = await req<ITypeRequest>(ConfigServerType.pokemons, ConfigEndpoint.getPokemons, query);
    console.log('###: res ', response);
    dispatch({ type: PokemonsActionTypes.FETCH_TYPE_RESOLVE, payload: response });
  } catch (error) {
    dispatch({ type: PokemonsActionTypes.FETCH_TYPE_REJECT, payload: error });
  }
};

export const ActionCreator = {
  choosePokemon: (id: number) => ({
      type: PokemonsActionTypes.CHOOSE_POKEMON,
      payload: id,
    }),
}

export default pokemons;
