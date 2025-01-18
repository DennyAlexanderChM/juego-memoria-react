import { useState } from "react";
import Card from "./components/Card";
import { motion } from "framer-motion";
import "./App.css"; // Estilos de la aplicación

function App() {
  const [cards, setCards] = useState(shuffleCards()); // Estado para las cartas
  const [flipped, setFlipped] = useState([]); // Estado para las cartas volteadas
  const [error, setError] = useState(0); // Estado para los errores
  const [turns, setTurns] = useState(0); // Estado para los turnos

  // Función para voltear las cartas
  function shuffleCards() {
    const initialCards = [
      { id: 1, value: "🍎", flipped: false },
      { id: 2, value: "🍎", flipped: false },
      { id: 3, value: "🍌", flipped: false },
      { id: 4, value: "🍌", flipped: false },
      { id: 5, value: "🍇", flipped: false },
      { id: 6, value: "🍇", flipped: false },
      { id: 7, value: "🍒", flipped: false },
      { id: 8, value: "🍒", flipped: false },
      { id: 9, value: "🍓", flipped: false },
      { id: 10, value: "🍓", flipped: false },
      { id: 11, value: "🍑", flipped: false },
      { id: 12, value: "🍑", flipped: false },
    ];
    return initialCards.sort(() => Math.random() - 0.5); // Ordenar aleatoriamente
  }

  // Función para voltear las cartas
  const handleFlip = (index) => {
    if (flipped.length < 2) {
      const newCards = [...cards]; // Copia de las cartas
      newCards[index].flipped = true; // Voltear la carta
      setCards(newCards); // Actualizar el estado de las cart
      setFlipped([...flipped, index]);

      if (flipped.length === 1) {
        setTimeout(() => checkMatch(index), 1000);
      }
    }
  };

  // Función para verificar si las cartas coinciden
  const checkMatch = (currentIndex) => {
    const [firstIndex] = flipped; // Obtiene el primer índice
    // Verifica si las cartas son iguales
    if (cards[firstIndex].value === cards[currentIndex].value) {
      setFlipped([]);
    } else {
      // No coinciden
      const newCards = [...cards];
      newCards[firstIndex].flipped = false;
      newCards[currentIndex].flipped = false;
      setCards(newCards);
      setFlipped([]);
      setError(error + 1); // Aumentar el contador de errores
    }
    setTurns(turns + 1); // Aumentar el contador de turnos
  };

  // Funcion para reiniciar el juego
  const handleReset = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setError(0);
    setTurns(0);
  };

  return (
    <div className="game">
      <h1>Juego de memoria</h1>
      <div className="ctrl-group">
        <span className="lib">Errores: {error}</span>
        <span className="lib">Turnos: {turns}</span>
        <button onClick={handleReset} className="btn">
          Reiniciar
        </button>
      </div>
      <motion.div
        className="card-grid"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            value={card.value}
            flipped={card.flipped}
            onClick={() => handleFlip(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default App;
