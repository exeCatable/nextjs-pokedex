"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';


const typeToColorMapping = {
  normal: "#A8A878",
  fire: "#F08030",
  fighting: "#C03028",
  water: "#6890F0",
  flying: "#A890F0",
  grass: "#78C850",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  psychic: "#F85888",
  rock: "#B8A038",
  ice: "#98D8D8",
  bug: "#A8B820",
  dragon: "#7038F8",
  ghost: "#705898",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

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
        <div className='flex gap-4 flex-wrap justify-center'>
      {pokemonDetails && pokemonDetails.map((pkm, index) => (
        <div key={index} className='bg-indigo-700 py-1 px-12 rounded-md w-[250px]'>
          <p className='text-gray-50 text-2xl font-bold capitalize'>{pkm.name}</p>    
          <Image alt='' src={pkm.sprites.front_default} width={100} height={100} className="max-w-[100%]" />
          <div className='flex gap-2'>
            {pkm.types.map((type, index) => (
              <span key={index} className='px-2 py-1 drop-shadow rounded-lg' style={{ backgroundColor: typeToColorMapping[type.type.name] }} >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      ))}
      </div>
    </main>
  );
}