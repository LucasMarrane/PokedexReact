import { useEffect, useState } from "react";
import "./App.scss";
import { usePokemonService } from "./services/pokemons";


function Storage(){
  function Set(value: number){
    sessionStorage.setItem("geracao", value.toString())
  }

  function Get() {
    return parseInt(sessionStorage.getItem("geracao") || "0")
  }

  return {Set, Get}
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
  ]
  );
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
  const {Get, Set} = Storage();
  const [valueGeracao, setValue] = useState(Get());
  const [geracaoSelecionada, setGeracaoSelecionada] = useState(geracoes[valueGeracao]);
  const { limite, pular } = geracaoSelecionada;
  const pokemons = ObterPokemons(limite, pular);

  useEffect(() => {    
    console.log(valueGeracao);
  }, [valueGeracao]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Pokedex</h3>
        <div>
        <label htmlFor="cars">Escolha uma geração:</label>
        <select value={valueGeracao} onChange={(e)=>{
          const indice = parseInt(e.target.value)
          setValue(indice);
          Set(indice)
          setGeracaoSelecionada(geracoes[indice])
        }}>
          {geracoes.map((item: any, index: number)=> {
            return (<option key={index} value={index.toString()}> Geração {index + 1}</option>)
          })}
        </select>
        </div>
        {isLoadingPokemon && (<h3>Carregando ...</h3>)}
        <ul>
          {!isLoadingPokemon && Array.isArray(pokemons) &&
            pokemons.map((item: any) => {
              let type = item.types.map((typeInfo : any) => typeInfo.type.name)
              return (
              <li key={item.id} >
                <div className={type[0]}> 
                 <img src={item.sprites.front_default} alt="" />{item.id} - {item.name}
                </div>
              </li>
            )})}
        </ul>
      </header>
    </div>
  );
}
