import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../common/Spinner/Spinner";
import { usePokemon } from "../../hooks/usePokemon";
import { background } from "../../utils/colorsByPokemonType";
import styles from "./style.module.scss";

interface Props {
  url: string;
}

export const PokemonCard = ({ url }: Props) => {
  const { pokemon, isLoading } = usePokemon(url);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* @ts-ignore */
  const colorSelected = background[pokemon?.types[0]?.type.name];

  
  useEffect(() => {
    if (imageLoaded) {
      setImageLoaded(false);
    }
  }, [pokemon?.sprites]);

  return (
    <Link to={`/${pokemon?.id}`} className={styles.pokemonCard}>
      <div style={{ borderColor: colorSelected }} className={styles.top}>
        {pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.front_default ? (
          <>
            <img
              src={
                pokemon?.sprites?.other?.dream_world?.front_default ||
                pokemon?.sprites?.front_default
              }
              alt={pokemon?.name}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out"
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {isLoading && (
              <div className={styles.loadingContainer}>
                <Spinner color={colorSelected} />
              </div>
            )}
          </>
        ) : (
          <div className={styles.loadingContainer}>
            <Spinner color={colorSelected} />
          </div>
        )}
      </div>
      <div style={{ background: colorSelected }} className={styles.bottom}>
        {pokemon?.name}
        <span style={{ color: 'white' }}> #{pokemon?.id}</span>
      </div>
    </Link>
  );
};
