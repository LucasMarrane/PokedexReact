import { useCallback, useEffect, useState } from "react";
import { Api } from "../api";

export function usePokemonService() {
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);

  function ObterPokemons(limite: number, pular: number) {
    const [pokemon, setPokemon] = useState<any>([]);
    const loadPokemonFromServer = useCallback(async () => {
      setIsLoadingPokemon(prev => true);
      const api = Api();
      let response: any = await api.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: limite,
          offset: pular,
        },
      });
      response = await response.data;

      let pokemons = response.results.map(async (item: any) => {
        const poke = await api.get(item.url);
        return await poke.data;
      });
      let promises = await Promise.all(pokemons);
      setIsLoadingPokemon(prev => false);

      setPokemon(promises);
    }, [limite, pular]);

    useEffect(() => {
      loadPokemonFromServer();
    }, [loadPokemonFromServer]);

    return pokemon;
  }

  return { ObterPokemons, isLoadingPokemon };
}
