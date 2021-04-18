import React, { useCallback } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import s from './PokemonCard.module.scss';
import { IPokemons } from '../../interface/pokemons';
import useTemplateStore from '../../hook/useData';

interface IPokemonCard {
  pokemon: IPokemons;
  isClicable?: boolean;
}

const PokemonCard: React.FC<IPokemonCard> = ({ pokemon, isClicable = true }) => {
  const { choosenPokemon, getPokemons } = useTemplateStore();
  const { id, name, types, img } = pokemon;

  const onCardClick = useCallback((evt) => {
    if (isClicable) {
      choosenPokemon(pokemon);
      getPokemons({ types: types[0] });
    } else {
      evt.preventDefault();
    }
  }, [pokemon, choosenPokemon, getPokemons, types, isClicable]);

  return (
    <Link to={`/pokemon/${id}`} onClick={onCardClick}>
      <div className={s.root} data-name={name}>
        <div className={cn(s.pictureWrap, s[types[0] as keyof typeof s])}>
          <img src={img} alt={name} />
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
