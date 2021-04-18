import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ActionCreator, getTypesAction } from '../store/pokemon';
import { getAbilityAction } from '../store/ability';
import { IInitialState } from '../store';

const useTemplateStore = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector((state: IInitialState) => state.pokemons);
  const abilities = useSelector((state: IInitialState) => state.abilities);

  const getPokemons = useCallback((qurey: object) => dispatch(getTypesAction(qurey)), [dispatch]);

  const getPokemonsByAbility = useCallback(
    (qurey: object) => {
      dispatch(getAbilityAction(qurey));
    },
    [dispatch],
  );

  const choosenPokemon = useCallback((pokemmon) => dispatch(ActionCreator.choosePokemon(pokemmon)), [dispatch]);

  return {
    pokemons,
    abilities,
    getPokemons,
    choosenPokemon,
    getPokemonsByAbility
  };
};

export default useTemplateStore;
