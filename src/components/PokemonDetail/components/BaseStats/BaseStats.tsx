import { IPokemon } from "../../../../interfaces/interfaces";
import { PokemonTypes } from "../PokemonTypes/PokemonTypes";
import styles from "./styles.module.scss";

interface Props {
  pokemon: IPokemon | null;
  colorSelected: string;
}

export const BaseStats = ({ pokemon, colorSelected }: Props) => {
  const maxStat = 255;
  const baseStatNames: Record<string, string> = {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "special-attack": "satk",
    "special-defense": "sdef",
    speed: "spd",
  };

  if (!pokemon) return null;

  return (
    <div className={styles.baseStats} style={{
      backgroundColor: "whitesmoke",
      borderTopLeftRadius: 50, 
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      top: 10 }}>
      <PokemonTypes pokemon={pokemon} key={pokemon.id}/>
      {pokemon.stats.map(({ base_stat, stat: { name } }) => (
        <div key={name} className={styles.item}>
          <span style={{ color: colorSelected }}>
            {baseStatNames[name]}
          </span>
          <div className={styles.rigth}>
            <p>0{base_stat}</p>
            <div className={styles.line}>
              <div
                className={styles.background}
                style={{ background: colorSelected }}
              />
              <div
                className={styles.secondLine}
                style={{
                  background: colorSelected,
                  opacity: "1",
                  width: `${(base_stat / maxStat) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

