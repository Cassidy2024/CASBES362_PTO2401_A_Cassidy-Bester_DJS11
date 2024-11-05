import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Audio = ({ onClose }) => {
  const location = useLocation();
  const episode = location.state?.episode;
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const savedTime = localStorage.getItem(`audio-timestamp-${episode ? episode.id : 'default'}`);
    if (savedTime) {
      setCurrentTime(parseFloat(savedTime));
    }
  }, [episode]);

  useEffect(() => {
    const saveTimeInterval = setInterval(() => {
      if (audioRef.current) {
        localStorage.setItem(
          `audio-timestamp-${episode ? episode.id : 'default'}`,
          audioRef.current.currentTime
        );
      }
    }, 10000);

    return () => clearInterval(saveTimeInterval);
  }, [episode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div style={audioContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4>Now Playing: {episode ? episode.title : "Default Audio"}</h4>
        <button
          onClick={onClose} // Call the onClose function
          style={{ fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      <p style={{ fontSize: '0.8rem' }}>{episode ? episode.description : "Default audio description."}</p>
      <audio
        ref={audioRef}
        controls
        src={"https://podcast-api.netlify.app/placeholder-audio.mp3"}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

const audioContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '300px',
  padding: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  zIndex: 1000
};

export default Audio;









