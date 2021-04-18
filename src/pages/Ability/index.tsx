import React, { useState, useEffect } from 'react';
import { withRouter, useLocation   } from 'react-router-dom';
import style from './Ability.module.scss';
import { IPokemons } from '../../interface/pokemons';
import useTemplateStore from '../../hook/useData';
import Slider from "../../components/Slider";

interface stateType {
  ability: { pathname: string }
}


const Ability: React.FC = () => {
  const { abilities: { data, isLoading, error }, getPokemonsByAbility } = useTemplateStore();
  
  const { state: {ability} } = useLocation<stateType>();

  const [pokemons, setPokemons] = useState<IPokemons[]>([]);

  useEffect(() => {
    if (ability) {
      getPokemonsByAbility({ name: ability })
    }
  }, [ability, getPokemonsByAbility])
  
  useEffect(() => {
    if (data) {
      const req = data.pokemon.reduce((acc, cur) => {
        acc.push(fetch(`https://cors.bridged.cc/http://zar.hosthot.ru/api/v1/pokemon/${cur.pokemon.name}`));
        return acc;
      }, []);

      Promise.all(req)
        .then((res) => Promise.all(res.map((it: any) => it.json())))
        .then((res) => setPokemons(res));
    }
  }, [data]);

 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, some error happened</p>;
  }

  return (
    <>
      {data && (
        <div className={style.root}>
          <div className={style.container}>
            <h1>{data.name}</h1>
            <hr />
            <p className={style.description}>{data.effect_entries[1].effect}</p>
          </div>
          <div className={style.container}>
            <h2>Related Pokemons</h2>
            <hr />
          </div>
         {pokemons &&  <Slider pokemons={pokemons} />}
        </div>
      )}
    </>
  );
};

export default withRouter(Ability);
