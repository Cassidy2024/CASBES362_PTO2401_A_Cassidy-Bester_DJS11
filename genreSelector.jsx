import React, { useEffect, useState } from 'react';

const GenreSelector = () => {
  const genres = [
    { id: 1, title: "Personal Growth" },
    { id: 2, title: "Investigative Journalism" },
    { id: 3, title: "History" },
    { id: 4, title: "Comedy" },
    { id: 5, title: "Entertainment" },
    { id: 6, title: "Business" },
    { id: 7, title: "Fiction" },
    { id: 8, title: "News" },
    { id: 9, title: "Kids and Family" },
  ];

  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredShows, setFilteredShows] = useState([]);

  // Fetch all shows
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        // Filter shows based on the selected genre
        if (selectedGenre) {
          const showsInGenre = data.filter((show) =>
            show.genres.includes(parseInt(selectedGenre))
          );
          setFilteredShows(showsInGenre);
        } else {
          setFilteredShows(data); // Show all if no genre is selected
        }
      })
      .catch((error) => console.error('Error fetching shows:', error));
  }, [selectedGenre]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
      <h2>Select a Genre:</h2>
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>

      <h3>Shows in Selected Genre:</h3>
      {filteredShows.length > 0 ? (
        <ul>
          {filteredShows.map((show) => (
            <li key={show.id}>
              <strong>{show.title}</strong> - {show.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No shows available for this genre.</p>
      )}
    </div>
  );
};

export default GenreSelector;




