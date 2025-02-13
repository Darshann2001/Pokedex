import { useEffect } from 'react';
import axios from 'axios';

function Pagination({ currentPage, setCurrentPage, setPokemonList, setLoading }) {
  const limit = 20;

  useEffect(() => {
    fetchPokemonList();
  }, [currentPage]);

  const fetchPokemonList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * limit}`
      );
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
    setLoading(false);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={() => setCurrentPage(prev => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination; 