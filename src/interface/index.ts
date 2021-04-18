import { IData, IPokemons } from './pokemons';

interface IMainState {
  isLoading: boolean;
  error: null | object;
}

export interface IStateRequest extends IMainState {
  data: IData;
  choosenPokemon?: IPokemons;
}

export interface IAbilityRequest extends IMainState {
  data: {
    name: string;
    ['effect_entries']: any[];
    pokemon: any[];
  };
}
