import React from 'react'
import ReactDOM from 'react-dom/client'
//import APIfetch from './APIfetch.jsx'
//import Favorites from './Favorites.jsx';

import PodcastInfo from './podcastInfo.jsx'
import Header from './Header.jsx';
//import Genre from './genreSelector.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      
    
     < Header />
     <PodcastInfo />
     
     
     
    </React.StrictMode>,
  )