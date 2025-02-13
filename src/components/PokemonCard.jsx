import { motion } from 'framer-motion';
import { typeColors } from '../utils/typeColors';

function PokemonCard({ pokemon }) {
  const mainType = pokemon.types[0].type.name;
  const backgroundColor = typeColors[mainType];

  return (
    <motion.div
      className="pokemon-card"
      style={{ backgroundColor }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="pokemon-image">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-info">
        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <div className="types">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="type-badge"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
        </div>
      </div>
    </motion.div>
  );
}

export default PokemonCard; 