import React, { useState } from 'react';
import './index.css'; // Make sure to import your CSS for the carousel

const Carousel = ({ shows }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < shows.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first show
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(shows.length - 1); // Loop back to the last show
    }
  };

  return (
    <div className="carousel-container">
      <button onClick={handlePrev} className="carousel-button prev">Prev</button>
      <div className="carousel-slider">
        {shows && shows.length > 0 ? (
          <div className="carousel-item">
            <h3>{shows[currentIndex].title}</h3>
            <img src={shows[currentIndex].image} alt={shows[currentIndex].title} />
            <p>{shows[currentIndex].description}</p>
          </div>
        ) : (
          <p>No shows available</p>
        )}
      </div>
      <button onClick={handleNext} className="carousel-button next">Next</button>
    </div>
  );
};

export default Carousel;
