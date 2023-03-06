import axios from "axios";
import { createContext, useCallback,  useEffect, useRef, useState } from "react";
import {
  PokemonByTypeResultType,
  PokemonType,
} from "../interfaces/types";

interface ContextProps {
	types: PokemonType[];
	filterSelected?: PokemonType;
	filteredPokemon: string[] | null;
	changeSelectedType: (type: PokemonType) => void;
  loading: boolean;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  nextUrlRef: React.MutableRefObject<string>;
  pokemon: Pokemon[];
  loadMore: () => Promise<void>;
}

type Pokemon = {
  name: string;
  url: string;
};

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

const PokemonProvider = ({ children }: any) => {
  const endpointAllPokemon =
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset-0";

  const defaultState: PokemonType = {
    name: "All",
    url: endpointAllPokemon,
  };

  //const for filtered pokemon
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [types, setTypes] = useState([defaultState]);
  const [filterSelected, setFilterSelected] = useState(defaultState);
  //const for pokemon
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const nextUrlRef = useRef<string>("");

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setPokemon(response.data.results);
      nextUrlRef.current = response.data.next;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(nextUrlRef.current);
      setPokemon((prevPokemon) => [
        ...prevPokemon,
        ...response.data.results,
      ]);
      nextUrlRef.current = response.data.next;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }, []);

  
  const getPokemonByType = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    setTypes([...types, ...data.results])
  };

  const changeSelectedType = async (type: PokemonType) => {
    setFilterSelected(type);

    const { data } = await axios.get(type?.url!);
    let pokemonByType = data?.pokemon?.map(
      ({ pokemon }: PokemonByTypeResultType) => pokemon?.url
    );

    type.name !== "All"
      ? setFilteredPokemon(pokemonByType)
      : setFilteredPokemon(null);
  };

  useEffect(() => {
    getPokemonByType();
    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        types,
        filterSelected,
        changeSelectedType,
        filteredPokemon,
        setHasMore,
        hasMore,
        loading,
        loadMore,
        nextUrlRef,
        pokemon
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
