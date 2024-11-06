import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Assuming the CSS file is named PodcastImage.css

const PodcastImage = () => {
  const [genres] = useState([
    { id: 1, title: 'Personal Growth' },
    { id: 2, title: 'Investigative Journalism' },
    { id: 3, title: 'History' },
    { id: 4, title: 'Comedy' },
    { id: 5, title: 'Entertainment' },
    { id: 6, title: 'Business' },
    { id: 7, title: 'Fiction' },
    { id: 8, title: 'News' },
    { id: 9, title: 'Kids and Family' },
  ]);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortByDate, setSortByDate] = useState('none');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPodcasts = useCallback(async () => {
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
    fetchPodcasts();
  }, [fetchPodcasts]);

  const addToFavorites = (podcast) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(fav => fav.id === podcast.id)) {
      favorites.push(podcast);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${podcast.title} added to favorites!`);
    } else {
      alert(`${podcast.title} is already in favorites.`);
    }
  };

  const handleSortChange = (event) => setSortOrder(event.target.value);
  const handleGenreChange = (event) => setSelectedGenre(event.target.value);
  const handleDateSortChange = (event) => setSortByDate(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());

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
    .filter((post) => selectedGenre ? post.genres.includes(parseInt(selectedGenre)) : true)
    .filter((post) => post.title.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (sortByDate === 'mostRecent') return new Date(b.updated) - new Date(a.updated);
      if (sortByDate === 'leastRecent') return new Date(a.updated) - new Date(b.updated);
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

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

      <label htmlFor="sortOrder">Sort By Title: </label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      <label htmlFor="dateSortOrder">Sort By Date: </label>
      <select id="dateSortOrder" value={sortByDate} onChange={handleDateSortChange}>
        <option value="none">None</option>
        <option value="mostRecent">Most Recent</option>
        <option value="leastRecent">Least Recent</option>
      </select>

      <label htmlFor="searchTitle">Filter by Title: </label>
      <input
        type="text"
        id="searchTitle"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {loading ? (
        <p>Loading shows...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="podcast-grid">
          {sortedFilteredPosts.length > 0 ? (
            sortedFilteredPosts.map((post) => (
              <div key={post.id} className="podcast-card">
                <div className="podcast-header">
                  <h3>
                    <Link to={`/podcast/${post.id}`} className="podcast-title">
                      {post.title}
                    </Link>
                  </h3>
                  {post.updated && (
                    <span className="updated-date">Last updated: {formatDate(post.updated)}</span>
                  )}
                </div>
                <Link to={`/podcast/${post.id}`} className="podcast-image-link">
                  <img src={post.image} alt={post.title} className="podcast-image" />
                </Link>
                <button onClick={() => addToFavorites(post)} className="add-to-favorites-button">
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





















