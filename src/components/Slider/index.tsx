import React, { useState, RefObject, useRef } from 'react';
import style from './Slider.module.scss';
import PokemonCard from '../PokemonCard';
import { IPokemons } from '../../interface/pokemons';

interface ISlider {
  pokemons: IPokemons[] | null;
}

const Slider: React.FC<ISlider> = ({ pokemons }) => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const slider = useRef<HTMLDivElement>();

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDown(true);
    if (slider && slider.current) {
      setStartX(e.pageX - slider.current.offsetLeft);
      setScrollLeft(slider.current.scrollLeft);
    }
  };

  const mouseLeaveHandler = () => {
    setIsDown(false);
  };

  const mouseUpHandler = () => {
    setIsDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDown) return;
    e.preventDefault();
    if (slider && slider.current) {
      const x = e.pageX - slider.current.offsetLeft;
      const walk = (x - startX) * 2;
      slider.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <>
      <div
        tabIndex={0}
        role="slider"
        aria-valuenow={0}
        onMouseDown={mouseDownHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        ref={slider as RefObject<HTMLDivElement>}
        className={style.sliderContainer}>
        {pokemons &&
          pokemons.map((pokemon) => {
            if (pokemon.stats) {
              return <PokemonCard isClicable={false} key={pokemon.id} pokemon={pokemon} />;
            }
            return null;
          })}
      </div>
    </>
  );
};

export default Slider;
