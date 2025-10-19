import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchPublicDomainMovies } from '../utils/archiveAPI';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const moviesPerPage = 20;

  useEffect(() => {
    loadMovies();
  }, [query, page]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const results = await searchPublicDomainMovies(query, page, moviesPerPage);
      setMovies(results.docs);
      setTotalPages(Math.ceil(results.numFound / moviesPerPage));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    // Update URL with new page number
    window.history.pushState({}, '', `/search?q=${query}&page=${newPage}`);
    loadMovies();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {movies.map(movie => (
          <MovieCard key={movie.identifier} movie={movie} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        baseUrl="/search"
      />
    </div>
  );
}
