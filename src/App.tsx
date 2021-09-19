import { useEffect, useState } from "react";
import "./App.scss";
import { usePokemonService } from "./services/pokemons";
import PerfectScrollbar from "react-perfect-scrollbar";

function Storage() {
  function Set(value: number) {
    sessionStorage.setItem("geracao", value.toString());
  }

  function Get() {
    return parseInt(sessionStorage.getItem("geracao") || "0");
  }

  return { Set, Get };
}
export function App() {
  const { ObterPokemons, isLoadingPokemon } = usePokemonService();

  const [geracoes] = useState([
    { limite: 151, pular: 0 },
    { limite: 100, pular: 151 },
    { limite: 135, pular: 251 },
    { limite: 107, pular: 386 },
    { limite: 156, pular: 493 },
    { limite: 72, pular: 649 },
    { limite: 86, pular: 721 },
  ]);
  const [tipos] = useState([
    "Steel",
    "Fire",
    "Grass",
    "Electric",
    "Water",
    "Ice",
    "Ground",
    "Rock",
    "Fairy",
    "Poison",
    "Bug",
    "Dragon",
    "Psychic",
    "Flying",
    "Fighting",
    "Ghost",
    "Dark",
    "Normal",
    "None",
  ]);

  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const { Get, Set } = Storage();
  const [valueGeracao, setValueGeracao] = useState(Get());
  const [geracaoSelecionada, setGeracaoSelecionada] = useState(
    geracoes[valueGeracao]
  );
  const [tipoSelecionado, setTipoSelecionado] = useState("None");
  const [letraSelecionada, setLetraSelecionada] = useState("None");

  const { limite, pular } = geracaoSelecionada;
  const { pokemon } = ObterPokemons(limite, pular);

  const [pokemons, setPokemons] = useState(pokemon);

  const filtrados = () => {
    const pokemonFiltrado = pokemon.filter((item: any) =>
      item.types
        .map((sub: any) => sub.type.name)
        .includes(tipoSelecionado.toLowerCase())
    );

    const poke =
      pokemonFiltrado.length > 0 ||
      (tipoSelecionado !== "None" && pokemonFiltrado.length === 0)
        ? pokemonFiltrado
        : pokemon;

        console.log(poke)

    return poke.filter((item: any) => {
      if (
        item.name.startsWith(
          letraSelecionada.toLowerCase()) || letraSelecionada === "None"        
      ) {
        
        return true;
      }
      return false
    });
  };

  useEffect(() => {
    setPokemons(filtrados());
  }, [geracaoSelecionada, pokemon, tipoSelecionado, letraSelecionada, filtrados]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pokedex</h2>
        <div className="configuracao">
          <div className="item">
            <select
              value={valueGeracao}
              onChange={(e) => {
                const indice = parseInt(e.target.value);
                setValueGeracao(indice);
                Set(indice);
                setTipoSelecionado("None");
                setLetraSelecionada("None");
                setPokemons(pokemon);
                setGeracaoSelecionada(geracoes[indice]);
              }}
            >
              {geracoes.map((item: any, index: number) => {
                return (
                  <option key={index} value={index.toString()}>
                    {" "}
                    Geração {index + 1}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="item">
            <select
              value={tipoSelecionado}
              className={tipoSelecionado.toLowerCase()}
              onChange={(e) => {
                const indice = e.target.value;
                setTipoSelecionado(indice);
              }}
            >
              {tipos.map((item: any, index: number) => {
                return (
                  <option
                    key={index}
                    value={item}
                    className={item.toLowerCase()}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="item">
            <select
              value={letraSelecionada}
              onChange={(e) => {
                const indice = e.target.value;
                setLetraSelecionada(indice);
              }}
            >
              <option value="None">A-Z</option>
              {letras.split("").map((item: any, index: number) => {
                return (
                  <option
                    key={index}
                    value={item}
                    className={item.toLowerCase()}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </header>
      {isLoadingPokemon && (
        <div className="loading">
          <h1>Carregando ...</h1>
        </div>
      )}
      {pokemons.length === 0 && (
        <div className="loading">
          <h1>Nenhum pokemon...</h1>
        </div>
      )}
      <PerfectScrollbar>
        <ul>
          {!isLoadingPokemon &&
            Array.isArray(pokemons) &&
            pokemons.map((item: any) => {
              let type = item.types.map((typeInfo: any) => typeInfo.type.name);
              return (
                <li key={item.id}>
                  <div className={type[0]}>
                    <img src={item.sprites.front_default} alt="" />
                    {item.id} - {item.name}
                  </div>
                </li>
              );
            })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
}
