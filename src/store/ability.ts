import { Dispatch } from 'react';
import req from '../utils/request';
import { ITypeRequest } from '../interface/pokemons';
import { ConfigServerType, ConfigEndpoint } from '../config';

export enum PokemonsActionTypes {
  FETCH_ABILITY = 'FETCH_ABILITY',
  FETCH_ABILITY_RESOLVE = 'FETCH_ABILITY_RESOLVE',
  FETCH_ABILITY_REJECT = 'FETCH_ABILITY_REJECT'
}

interface TypeActions {
  type: PokemonsActionTypes;
  payload?: string[];
}

type ActionTypes = TypeActions;

interface IEffect {
  effect: string;
}

interface IAbility {
  name: string;
  ['effect_entries']?: IEffect[];
  pokemon: any[] | null;
}

const initialState: IAbility = {
  name: '',
  pokemon: null,
};

const abilities = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonsActionTypes.FETCH_ABILITY:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      };
    case PokemonsActionTypes.FETCH_ABILITY_RESOLVE:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case PokemonsActionTypes.FETCH_ABILITY_REJECT:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAbilityAction = (query = {}) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch({ type: PokemonsActionTypes.FETCH_ABILITY });
  try {
    const response = await req<ITypeRequest>(ConfigServerType.pokemonsAbilities, ConfigEndpoint.getAbilities, query);
    console.log('###: ability  ', response);
    dispatch({ type: PokemonsActionTypes.FETCH_ABILITY_RESOLVE, payload: response });
  } catch (error) {
    dispatch({ type: PokemonsActionTypes.FETCH_ABILITY_REJECT, payload: error });
  }
};


export default abilities;
