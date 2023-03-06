import { FadeInImage } from "../FadeInImage/FadeInImage";
import { usePokemon } from "../../hooks/usePokemon";
import { Loader } from "../../common/Loader/Loader";
import { background } from "../../utils/colorsByPokemonType"
import "./styles.module.scss";
import { FooterPokemon } from "../FooterPokemon/FooterPokemon";
import { Header } from "./components/Header/Header";
import { BaseStats } from "./components/BaseStats/BaseStats";
import { Stats } from "./components/Stats/Stats";

interface Props {
  pokemonId: string;
}

interface Styles {
  [key: string]: React.CSSProperties;
}

const styles: Styles = {
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "1.25rem",
    color: "white"
  },
  regularText: {
    fontSize: "1rem",
    fontWeight: "normal",
    color: "#fff",
    marginRight: "0.625rem",
  },
  basicSprite: {
    width: "12.5rem",
    height: "12.5rem",
    marginRight: "0.625rem",
  },
  progressBar: {
    height: "1.25rem",
  },
};


export const PokemonDetail = ({ pokemonId }: Props) => {
  const { pokemon} = usePokemon("", pokemonId);

  /* @ts-ignore */
  const colorSelected = background[pokemon?.types[0]?.type.name];

  if (!pokemon) {
    return (
      <div style={{ background : colorSelected,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', }} >
        <Loader size={50} color="fff" />
      </div>
    );
  }

  return (
    <>
    <div className="info" style={{backgroundColor: colorSelected
    }}>
    <Header pokemon={pokemon} color={colorSelected}/>
    
    <div style={{
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       gap: "0.5rem"
    }}>
        <img style={{position: "relative"}}
          src={
            pokemon?.sprites?.other?.dream_world?.front_default ||
            pokemon?.sprites?.front_default
          }
          alt={pokemon?.name}
        />
    </div>
    <div style={{ height: "100%", margin: 0, marginLeft: 10 }}>
      {/* Height and Weight */}
      <Stats pokemon={pokemon} key={pokemon.id}/>
      {/* Stats */}
       <BaseStats colorSelected={colorSelected} pokemon={pokemon} key={pokemon.id}/>
      {/* Abilities */}
      <div style={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "0.5rem"
      }}>
        <h2 style={styles.title}>Base Abilities</h2>
        <div className="flexRow">
          {pokemon?.abilities.map(({ ability }) => (
            <span style={styles.regularText} key={ability.name}>
              {ability.name}
            </span>
          ))}
        </div>
      </div> 
      {/* Sprites */}
      <div style={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "0.5rem"
      }}>
        <h2 style={styles.title}>{pokemon?.sprites?.front_default! ? "Sprites": ""}</h2>
        <div className="flexRow">
          <FadeInImage
            pokemon={pokemon!}
            uri={pokemon?.sprites?.front_default!}
            style={styles.basicSprite}
          />
          <FadeInImage
            pokemon={pokemon!}
            uri={pokemon?.sprites?.back_default!}
            style={styles.basicSprite}
          />
          <FadeInImage
            pokemon={pokemon!}
            uri={pokemon?.sprites?.front_shiny!}
            style={styles.basicSprite}
          />
          <FadeInImage
            pokemon={pokemon!}
            uri={pokemon?.sprites?.back_shiny!}
            style={styles.basicSprite}
          />
        </div>
      </div>         
      </div>
      </div>
      <FooterPokemon/>
      </>
    );
  };
      
