import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const PodcastImage = () => {
  const [genres, setGenres] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app/genres');
      if (!response.ok) throw new Error('Failed to fetch genres');
      const data = await response.json();
      setGenres(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching genres, using fallback:", err);
      setGenres([/* Fallback genres */]);
    }
  }, []);

  const fetchPodcasts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      if (!response.ok) throw new Error('Data fetching failed');
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching podcasts:", err);
      setPosts([]);
      setError('Failed to fetch podcasts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
    fetchPodcasts();
  }, [fetchGenres, fetchPodcasts]);

  const addToFavorites = (podcast) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.find(fav => fav.id === podcast.id);

    if (!isFavorite) {
      favorites.push(podcast);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${podcast.title} added to favorites!`);
    } else {
      alert(`${podcast.title} is already in favorites.`);
    }
  };

  const handleSortChange = (event) => setSortOrder(event.target.value);
  const handleGenreChange = (event) => setSelectedGenre(event.target.value);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const sortedFilteredPosts = posts
    .filter((post) => (selectedGenre ? post.genres.includes(parseInt(selectedGenre)) : true))
    .sort((a, b) => (sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  return (
    <div>
      <h2>Available Shows:</h2>
      <label htmlFor="genreSelect">Filter by Genre: </label>
      <select id="genreSelect" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>

      <label htmlFor="sortOrder">Sort By: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      {loading ? (
        <p>Loading shows...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {sortedFilteredPosts.length > 0 ? (
            sortedFilteredPosts.map((post) => (
              <div key={post.id} style={{ margin: '20px', border: '1px solid #ddd', padding: '15px', maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: '0' }}>
                    <Link to={`/podcast/${post.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                      {post.title}
                    </Link>
                  </h3>
                  {post.updated && (
                    <span style={{ fontSize: '0.9em', color: '#777' }}>
                      Last updated: {formatDate(post.updated)}
                    </span>
                  )}
                </div>
                <Link to={`/podcast/${post.id}`}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', marginTop: '10px', height: 'auto' }} />
                </Link>
                <button onClick={() => addToFavorites(post)} style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer' }}>
                  Add to Favorites
                </button>
              </div>
            ))
          ) : (
            <p>No shows available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastImage;
















