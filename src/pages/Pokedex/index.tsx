import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import Layout from '../../components/Layout';
import Heading, { TitleSize } from '../../components/Heading';
import PokemonCard from '../../components/PokemonCard';
import Input from '../../components/Form/Input';
import { IPokemons, IQuery, IOffset } from '../../interface/pokemons';

import h from './Pokedex.module.scss';
import useDebounce from '../../hook/useDebounce';
import Pagination from '../../components/Pagination';
import useTemplateStore from "../../hook/useData";

const LIMIT = 21;

const PokedexPage: React.FC = () => {
  const { pokemons: { data, isLoading, error }, getPokemons } = useTemplateStore();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchQuery, setQuery] = useState<IQuery>({});
  const [offset, setOffset] = useState<IOffset>({
    limit: LIMIT
  });
  const debaunceValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    setOffset((state) => ({
      ...state,
      offset: null,
    }))
    setQuery((state) => ({
      ...state,
      name: debaunceValue,
    }));
  }, [debaunceValue]);

  useEffect(() => {
    getPokemons({...searchQuery, ...offset})
  }, [searchQuery, offset, getPokemons])

  const onPageChange = useCallback((pageNumber: number) => {
    setOffset((state) => ({
      ...state,
      offset: LIMIT * pageNumber,
    }));
  }, [])

  const handleSearchChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(() => evt.target.value);
  }, []);

  if (error) {
    return <div>Something went wrong </div>;
  }

  return (
    <div className={cn(h.root)}>
      <Layout>
        <div>
          <Heading tag={TitleSize.xl}>{!isLoading && data && data.total} Pokemons for you to choose</Heading>
          <div>
            <Input searchValue={searchValue} queryHandler={handleSearchChange} />
          </div>
          <div className={cn(h.cardContainer)}>
            {!isLoading && data ? (
              data.pokemons.map((pokemon: IPokemons) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                />
              ))
            ) : (
              <img style={{margin: "0 auto"}} src="https://overreacted.io/fc3bddf6d4ca14bc77917ac0cfad3608/pikachu.gif" alt="pick" />
            )}
          </div>
          <Pagination onPageChange={onPageChange} total={data ? data.total : 0} searchValue={searchValue} />
        </div>
      </Layout>
    </div>
  );
};

export default React.memo(PokedexPage);
