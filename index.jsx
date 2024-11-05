import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastInfo from './podcastInfo.jsx';
import Header from './Header.jsx';
import PodcastDetails from './PodcastDetails.jsx';
import Favorites from './Favorites.jsx';
import Audio from './audio.jsx';

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
        <Route path="/podcast/:id" element={<PodcastDetails showAudioPlayer={showAudioPlayer} />} /> {/* Pass showAudioPlayer */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/audio" element={<Audio onClose={hideAudioPlayer} />} />
        <Route path="/audio" element={<Audio />} />
      </Routes>
      
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

