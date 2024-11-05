import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Audio = () => {
  const location = useLocation();
  const episode = location.state?.episode;
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Retrieve saved timestamp from localStorage when the component mounts
  useEffect(() => {
    const savedTime = localStorage.getItem(`audio-timestamp-${episode ? episode.id : 'default'}`);
    if (savedTime) {
      setCurrentTime(parseFloat(savedTime));
    }
  }, [episode]);

  // Set up event listeners to update playback time in localStorage within 10-second intervals
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

  // Set the audio to start at the saved playback time
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleClose = () => {
    const confirmClose = window.confirm("Are you sure you want to close this page?");
    if (confirmClose) {
      navigate(-1); // Navigate back
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Now Playing: {episode ? episode.title : "Default Audio"}</h2>
        <button onClick={handleClose} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          ×
        </button>
      </div>
      <p>{episode ? episode.description : "Default audio description."}</p>
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

export default Audio;






