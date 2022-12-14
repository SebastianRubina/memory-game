import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": `${process.env.PUBLIC_URL}/img/bulbasaur.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/charmander.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/caterpie.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/jigglypuff.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/pikachu.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/squirtle.png`, matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0);
  }

  // Handle a Choice
  const handleChoice = (card) => {
    setTimeout(() => setDisabled(false), 200);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Start Game Automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  // Compare 2 Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // Reset Turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Pokemon Memory!</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} 
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
