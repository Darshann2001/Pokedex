import { useState } from 'react'
import { motion } from 'framer-motion'
import PokemonCard from './components/PokemonCard'
import SearchBar from './components/SearchBar'
import PokemonList from './components/PokemonList'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  const [searchedPokemon, setSearchedPokemon] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="app">
      <h1>Pokédex</h1>
      <SearchBar setPokemon={setSearchedPokemon} setLoading={setLoading} />
      
      <div className="pokemon-container">
        {loading ? (
          <div className="loader"></div>
        ) : searchedPokemon ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="search-result"
          >
            <PokemonCard pokemon={searchedPokemon} />
            <button 
              className="clear-search"
              onClick={() => setSearchedPokemon(null)}
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <PokemonList />
        )}
      </div>
      <ChatBot />
    </div>
  )
}

export default App
