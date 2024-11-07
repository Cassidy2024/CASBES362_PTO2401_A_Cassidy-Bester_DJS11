import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastInfo from './podcastInfo.jsx';
import Header from './Header.jsx';
import PodcastDetails from './PodcastDetails.jsx';
import Favorites from './Favorites.jsx';
import Audio from './audio.jsx';
import './index.css';
import Carousel from './Carousel.jsx';
import FavoriteEpisodes from './FavoriteEpisodes';

const App = () => {
  const [showAudio, setShowAudio] = useState(false); // Start with audio hidden

  const showAudioPlayer = () => {
    setShowAudio(true); // Function to show audio player
  };

  const hideAudioPlayer = () => {
    setShowAudio(false); // Function to hide audio player
  };

  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<PodcastInfo />} />
        <Route path="/podcast/:id" element={<PodcastDetails showAudioPlayer={showAudioPlayer} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/podcastInfo" element={<PodcastInfo />} />
        <Route path="/favorite-episodes" element={<FavoriteEpisodes />} />
      </Routes>
      {/* Conditionally render Audio component only when showAudio is true */}
      {showAudio && <Audio onClose={hideAudioPlayer} />}
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


