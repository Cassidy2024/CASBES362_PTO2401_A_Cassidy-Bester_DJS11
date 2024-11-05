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
      const fallbackGenres = [
        { id: 1, title: 'Personal Growth' },
        { id: 2, title: 'Investigative Journalism' },
        { id: 3, title: 'History' },
        { id: 4, title: 'Comedy' },
        { id: 5, title: 'Entertainment' },
        { id: 6, title: 'Business' },
        { id: 7, title: 'Fiction' },
        { id: 8, title: 'News' },
        { id: 9, title: 'Kids and Family' }
      ];
      setGenres(fallbackGenres);
      
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

  const handleSortChange = (event) => setSortOrder(event.target.value);
  const handleGenreChange = (event) => setSelectedGenre(event.target.value);

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
              <div key={post.id} style={{ margin: '10px' }}>
                <h3>
                  <Link to={`/podcast/${post.id}`}>
                    {post.title} (seasons: {post.seasons})
                  </Link>
                </h3>
                <Link to={`/podcast/${post.id}`}>
                  <img src={post.image} alt={post.title} style={{ width: '200px', height: 'auto' }} />
                </Link>
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












