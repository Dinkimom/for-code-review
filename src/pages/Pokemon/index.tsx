import React, { useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import cn from 'classnames';
import Slider from '../../components/Slider';
import s from './Pokemon.module.scss';
import useTemplateStore from '../../hook/useData';

const Pokemon: React.FC = () => {
  const {
    pokemons: { data, choosenPokemon, error },
  } = useTemplateStore();

  const pokemon = useMemo(() => choosenPokemon, [choosenPokemon]);
  const relatedPokemons = useMemo(() => {
    if (data && choosenPokemon) {
      return data.pokemons.filter((it) => it.id !== choosenPokemon.id);
    }
    return null;
  }, [choosenPokemon, data]);

  if (error) {
    return <div>Something went wrong </div>;
  }

  return (
    <>
      <div className={s.root}>
        <div className={s.card}>
          <div className={s.imageContainer}>
            <div>
              <img width="255" height="261" src={pokemon && pokemon.img} alt={pokemon && pokemon.name} />
            </div>
            <div className={s.types}>
              {pokemon &&
                pokemon.types.map((nature: string) => (
                  <span key={nature + pokemon.id} className={cn(s.label, s[nature as keyof typeof s])}>
                    {nature}
                  </span>
                ))}
            </div>
          </div>
          <div className={s.infoContainer}>
            <h2 className={s.titleName}>{pokemon && pokemon.name}</h2>
            <div className={s.abilities}>
              <h2>Abilities</h2>
              {pokemon &&
                pokemon.abilities.map((ability) => (
                  <Link to={{
                    pathname: `/ability/${ability}`,
                    state: { ability }
                  }} key={ability + pokemon.id} className={s.ability}>
                    {ability}
                  </Link>
                ))}
            </div>
            <div className={s.statsContainer}>
              <div className={s.statsWrapper}>
                <div className={s.statItem}>
                  <div className={s.statValue}>{pokemon && pokemon.stats.attack}</div>
                  Attack
                </div>
              </div>
              <div className={s.statsWrapper}>
                <div className={s.statItem}>
                  <div className={s.statValue}>{pokemon && pokemon.stats.defense}</div>
                  Defense
                </div>
              </div>
              <div className={s.statsWrapper}>
                <div className={s.statItem}>
                  <div className={s.statValue}>{pokemon && pokemon.stats['special-attack']}</div>
                  Sp attack
                </div>
              </div>
              <div className={s.statsWrapper}>
                <div className={s.statItem}>
                  <div className={s.statValue}>{pokemon && pokemon.stats['special-defense']}</div>
                  Sp defense
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.container}>
          <h2>Related Pokemons of type { `"${choosenPokemon?.types[0]}"` }</h2>
          <hr />
        </div>
        {relatedPokemons && <Slider pokemons={relatedPokemons} />}
      </div>
    </>
  );
};

export default withRouter(Pokemon);
