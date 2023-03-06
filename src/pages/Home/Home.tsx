import { IconSmPokeball } from "../../assets/pokemonIcons";
import { FilterByType } from "../../common/FilterByType/FilterByType";
import { PokemonList } from "../../components/PokemonList/PokemonList";

import styles from "./styles.module.scss";

export const Home = () => {


  return (
    <div className={styles.home}>
      <header>
        <div >
          <span>Pokédex</span>
        </div>
      </header>
      <FilterByType/>
      <PokemonList
      />
      
      
    </div>
  );
};
