import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchPublicDomainMovies } from '../utils/archiveAPI';

/**
 * Search Results Page (Optimized)
 * - Debounced API call to prevent lag
 * - Scroll to top on new results
 * - Clear loader and error handling
 * - Fast updates with pagination + query params
 * - SEO: title includes search term
 */
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q')?.trim() || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const moviesPerPage = 20;

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setLoading(false);
      setError('Please enter a search term to find classic movies.');
      return;
    }
    loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, page]);

  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const results = await searchPublicDomainMovies(query, page, moviesPerPage);
      if (results.docs.length === 0) {
        setError(`No movies found for "${query}". Try a different keyword.`);
      } else {
        setMovies(results.docs);
        setTotalPages(Math.ceil(results.numFound / moviesPerPage));
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Search Results for "{query}"
      </h1>

      {/* Loader */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Error message */}
      {!loading && error && (
        <p className="text-center text-gray-600 dark:text-gray-400 italic mb-6">
          {error}
        </p>
      )}

      {/* Movie Grid */}
      {!loading && movies.length > 0 && (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
          aria-label="Search results"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.identifier} movie={movie} />
          ))}
        </section>
      )}

      {/* Pagination Component */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          baseUrl="/search"
        />
      )}
    </main>
  );
}
