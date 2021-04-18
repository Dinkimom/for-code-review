import { combineReducers } from 'redux';
import { IStateRequest, IAbilityRequest } from '../interface';
import pokemons from './pokemon';
import abilities from "./ability";

export interface IInitialState {
  pokemons: IStateRequest;
  abilities: IAbilityRequest
  // relatedTypesPokemons: 
}

const createRootReducer = () =>
  combineReducers({
    pokemons,
    abilities
  });

export default createRootReducer;
