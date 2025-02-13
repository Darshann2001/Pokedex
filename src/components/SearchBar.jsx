import { useState } from 'react';
import axios from 'axios';

function SearchBar({ setPokemon, setLoading }) {
  const [search, setSearch] = useState('');

  const searchPokemon = async (e) => {
    e.preventDefault();
    if (!search) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      setPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setPokemon(null);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={searchPokemon} className="search-box">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon..."
      />
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}

export default SearchBar; 