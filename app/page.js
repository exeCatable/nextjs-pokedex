"use client"

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    async function pokemonData() {
      const details = [];
      
      // Fetch pokemon
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");
      const data = await response.json();
      setData(data);


      for (const pkm of data.results) {
        const pokemonData = {
          name: pkm.name,
          url: pkm.url
        } 

        // Fetch data from each pokemon's URL
        const response = await fetch(pokemonData.url);
        const pokemonDetails = await response.json();
        details.push(pokemonDetails);

        setPokemonDetails(details)
        // console.log(pokemonDetails);
      }
    }

    pokemonData();
  },[]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* {data && data.results.map((pokemon, index) => (
        <p key={index}>{pokemon.name}</p>
      ))} */}
      {pokemonDetails && pokemonDetails.map((pkm, index) => (
        <div key={index}>
          <p>{pkm.name}</p>    
          <img src={pkm.sprites.front_default}></img>  
        </div>
      ))}
    </main>
  );
}