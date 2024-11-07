import React, { useState } from 'react';
import './index.css';

const Carousel = ({ shows }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const getRandomIndex = () => Math.floor(Math.random() * shows.length);

  const handleNext = () => {
    let randomIndex;
    do {
      randomIndex = getRandomIndex();
    } while (randomIndex === currentIndex && shows.length > 1);
    
    setHistory((prevHistory) => [...prevHistory, currentIndex]);
    setCurrentIndex(randomIndex);
  };

  const handlePrev = () => {
    if (history.length > 0) {
      const previousIndex = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentIndex(previousIndex);
    } else {
      setCurrentIndex(shows.length - 1);
    }
  };

  return (
    <div className="carousel-wrapper">
      <h2>Shows you may like</h2>
      <div className="carousel-container">
        <button onClick={handlePrev} className="carousel-button prev">Prev</button>
        <button onClick={handleNext} className="carousel-button next">Next</button>
        <div className="carousel-slider">
          {shows && shows.length > 0 ? (
            <div className="carousel-item">
              <h3>{shows[currentIndex].title}</h3>
              <img src={shows[currentIndex].image} alt={shows[currentIndex].title} />
            </div>
          ) : (
            <p>No shows available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;





