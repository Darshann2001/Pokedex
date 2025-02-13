import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function ChatBot() {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hello Trainer! I'm Dexter, your Pokédex assistant. Ask me about any Pokémon!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchPokemonInfo = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const pokemon = response.data;
      
      return `
${pokemon.name.toUpperCase()}
Type: ${pokemon.types.map(t => t.type.name).join(', ')}
Height: ${pokemon.height/10}m
Weight: ${pokemon.weight/10}kg
Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}
Base Stats:
${pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('\n')}
      `;
    } catch (error) {
      return "I couldn't find that Pokémon. Please check the spelling and try again!";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setLoading(true);

    // Get bot response
    const response = await fetchPokemonInfo(input);
    
    // Add bot response
    setMessages(prev => [...prev, { type: 'bot', content: response }]);
    
    setLoading(false);
    setInput('');
  };

  return (
    <>
      <button 
        className="pokedex-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src="/pokedex-icon.png" 
          alt="Pokédex"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNmZjAwMDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI1IiBmaWxsPSIjZmZmIi8+PC9zdmc+';
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="pokedex-chatbot"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pokedex-header">
              <div className="camera-lens"></div>
              <div className="status-lights">
                <div className="light red"></div>
                <div className="light yellow"></div>
                <div className="light green"></div>
              </div>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.type}`}
                  initial={{ x: message.type === 'user' ? 50 : -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.content}
                </motion.div>
              ))}
              {loading && (
                <div className="message bot">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a Pokémon name..."
                className="chat-input"
              />
              <button type="submit" className="send-button">
                <div className="triangle"></div>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatBot; 