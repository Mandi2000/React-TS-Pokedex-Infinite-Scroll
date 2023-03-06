import { PokemonCard } from "../PokemonCard/PokemonCard.js";
import styles from "./styles.module.scss";
import React, {  useEffect, useCallback, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../../common/Loader/Loader.js";
import { FooterPokemon } from "../FooterPokemon/FooterPokemon.js";
import { FilterByType } from "../../common/FilterByType/FilterByType.js";
import { PokemonContext } from "../../context/PokemonContext.jsx";



export const PokemonList: React.FC = () => {
  const { filteredPokemon, loading, hasMore, loadMore, setHasMore, nextUrlRef, pokemon} =	useContext(PokemonContext);


  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    if (!loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setHasMore(nextUrlRef.current !== null);
  }, [pokemon]);

  return (
    <>
      <InfiniteScroll
        dataLength={pokemon.length}
        next={loadMore}
        hasMore={hasMore}
        loader={null}
      >
        <div className={styles.allPokemon}>
          {filteredPokemon ?
          filteredPokemon.map((poke) => (
            <React.Fragment key={poke}>
              {<PokemonCard url={poke} />}
            </React.Fragment>
          )): 
          pokemon.map((poke) => (
            <React.Fragment key={poke.url}>
              {<PokemonCard url={poke.url} />}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
      <FooterPokemon/>
    </>
  );
};
