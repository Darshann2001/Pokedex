import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PokemonCard from './PokemonCard';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const loadingRef = useRef(null);
  const limit = 20;

  const fetchPokemonDetails = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const loadMorePokemon = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      
      const pokemonDetails = await Promise.all(
        response.data.results.map(pokemon => fetchPokemonDetails(pokemon.url))
      );
      
      setPokemonList(prev => [...prev, ...pokemonDetails]);
      setOffset(prev => prev + limit);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMorePokemon();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadingRef.current, offset]);

  return (
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <motion.div
          key={pokemon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PokemonCard pokemon={pokemon} />
        </motion.div>
      ))}
      <div ref={loadingRef} className="loading-trigger">
        {loading && <div className="loader"></div>}
      </div>
    </div>
  );
}

export default PokemonList; 