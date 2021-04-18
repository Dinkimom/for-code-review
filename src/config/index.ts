const config = {
  client: {
    server: {
      pokemons: {
        protocol: 'http',
        host: 'zar.hosthot.ru',
      },
      pokemonsAbilities: {
        protocol: 'https',
        host: 'pokeapi.co'
      }
    },
    endpoint: {
      getPokemons: {
        method: 'GET',
        url: {
          pathname: '/api/v1/pokemons',
        },
        params: [],
      },
      getPokemon: {
        method: 'GET',
        url: {
          pathname: '/api/v1/pokemon/{id}',
        },
        params: ['id'],
      },
      getAbilities: {
        method: 'GET',
        url: {
          pathname: 'api/v2/ability/{name}'
        },
        params: ['name'],
      }
    },
  },
};

export enum ConfigServerType {
  pokemons = "pokemons",
  pokemonsAbilities = "pokemonsAbilities",
}

export enum ConfigEndpoint {
  getPokemons = "getPokemons",
  getPokemon = "getPokemon",
  getAbilities = "getAbilities"
}

export default config;
