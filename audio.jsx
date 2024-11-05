import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Audio = ({ onClose }) => {
  const location = useLocation();
  const episode = location.state?.episode; // Get episode from location state
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (episode) {
      console.log("Current Episode:", episode); // Debugging line
      localStorage.setItem('currentEpisode', JSON.stringify(episode)); // Save episode data to local storage
      setCurrentTime(localStorage.getItem(`audio-timestamp-${episode.id}`) || 0); // Load saved time if exists
    }
  }, [episode]);

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
      audioRef.current.currentTime = currentTime; // Set the current time of audio
      audioRef.current.play().catch(error => console.error("Autoplay prevented:", error)); // Attempt to play audio
    }
  }, [currentTime]);

  const handleCanPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Play prevented:", error)); // Play when ready
    }
  };

  return (
    <div style={audioContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4>Now Playing: {episode ? episode.title : "No episode selected"}</h4>
        <button
          onClick={onClose}
          style={{ fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      <p style={{ fontSize: '0.8rem' }}>{episode ? episode.description : "No description available."}</p>
      <audio
        ref={audioRef}
        controls
        src={episode ? episode.file : "https://podcast-api.netlify.app/placeholder-audio.mp3"} // Ensure the audio URL is correct
        onCanPlay={handleCanPlay} // Call play when it's ready
        onEnded={() => console.log("Audio playback ended")} // Log when playback ends
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










