import { useParams } from "react-router-dom";
import { PokemonDetail } from "../../components/PokemonDetail/PokemonDetail";

export const Details = () => {
  const { pokemonId } = useParams();

  return <PokemonDetail pokemonId={pokemonId} />;
};
