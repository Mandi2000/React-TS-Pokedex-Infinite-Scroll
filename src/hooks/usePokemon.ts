import axios from "axios";
import { useEffect, useState } from "react";
import { IPokemon } from "../interfaces/interfaces";

export const usePokemon = (url?: string, id?: string) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const axiosGetPokemon = async () => {
    try {
      setIsLoading(true);
      const response = url
        ? await axios.get(url)
        : await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      const data = response.data;
      setPokemon(data || null);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axiosGetPokemon();
  }, [url, id]);

  return { pokemon, isLoading, isError };
};
