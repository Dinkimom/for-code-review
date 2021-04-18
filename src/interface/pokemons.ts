interface IStats {
  attack: number;
  defense: number;
  hp: number;
  "special-attack": number;
  "special-defense": number;
  speed: number;
}

export interface IPokemons {
  abilities: string[];
  'base_experience': number;
  height: number;
  id: number;
  img: string;
  'is_default': boolean;
  name: string;
  'name_clean': string;
  order: number;
  stats: IStats;
  types: string[];
  weight: number;
}

export interface IData {
  count?: number;
  limit?: string;
  offset?: number;
  pokemons: IPokemons[];
  total: number;
}

export type ITypeRequest = string[];

export interface IQuery {
  name?: string,
  type?: string,
}

export interface IOffset {
  offset?: number | null,
  limit: number
}