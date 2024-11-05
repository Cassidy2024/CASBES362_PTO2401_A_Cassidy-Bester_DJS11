import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastInfo from './podcastInfo.jsx';
import Header from './Header.jsx';
import PodcastDetails from './PodcastDetails.jsx';
import Favorites from './Favorites.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PodcastInfo />} />
        <Route path="/podcast/:id" element={<PodcastDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);