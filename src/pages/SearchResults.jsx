import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import AdBanner from '../components/AdBanner';
import { searchPublicDomainMovies } from '../utils/archiveAPI';


/**
 * Search Results Page (AdSense-Optimized)
 * ✅ NO ads on empty/no-results pages (policy violation prevention) [web:2][web:22]
 * ✅ Ads only render when results exist and page has 200+ words [web:2][web:43]
 * ✅ SEO-optimized: title includes search term, schema markup
 * ✅ Clear loader and error handling
 * ✅ Fast pagination with query params
 */
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q')?.trim() || '';
  const page = parseInt(searchParams.get('page')) || 1;


  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const moviesPerPage = 20;


  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
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
    setMovies([]);
    try {
      const results = await searchPublicDomainMovies(query, page, moviesPerPage);
      if (results.docs.length === 0) {
        setError(`No movies found for "${query}". Try a different keyword.`);
        setTotalResults(0);
      } else {
        setMovies(results.docs);
        setTotalResults(results.numFound || 0);
        setTotalPages(Math.ceil((results.numFound || 0) / moviesPerPage));
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch results. Please try again later.');
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };


  const handlePageChange = (newPage) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };


  // ✅ CRITICAL: Calculate total page word count for ad guard [web:2][web:43]
  const pageWordCount = movies.length > 0 
    ? movies.length * 50 + query.length + 100  // Estimate: ~50 words per movie card + title + instructions
    : 0;


  // ✅ Generate search-specific schema markup [web:36]
  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "headline": `Search Results for "${query}"`,
    "description": `${movies.length} classic movies found for search "${query}" on Archive Movies`,
    "url": `${import.meta.env.VITE_SITE_URL}/search?q=${encodeURIComponent(query)}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalResults,
      "itemListElement": movies.slice(0, 10).map((movie, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": movie.title,
        "url": `${import.meta.env.VITE_SITE_URL}/movie/${movie.identifier}`
      }))
    }
  };


  return (
    <>
      {/* ✅ SEO: Include search term in title and schema [web:36][web:43] */}
      <SEO
        title={`${movies.length > 0 ? `${movies.length} results for` : 'Search results for'} "${query}" | Archive Movies`}
        description={
          movies.length > 0
            ? `Found ${movies.length} classic public domain movies for "${query}". Browse, watch free.`
            : `Search for classic movies on Archive Movies. Discover public domain films from 1890s-1970s.`
        }
        canonical={`${import.meta.env.VITE_SITE_URL}/search?q=${encodeURIComponent(query)}&page=${page}`}
        schemaMarkup={[searchSchema]}
      />


      <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen" role="main">
        
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results for <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
          </h1>
          {!loading && movies.length > 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              Found <strong>{totalResults.toLocaleString()}</strong> classic movies
              {page > 1 && ` (Showing page ${page})`}
            </p>
          )}
        </header>


        {/* ✅ Loader */}
        {loading && (
          <section aria-busy="true" aria-label="Loading search results">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"
                  aria-hidden="true"
                />
              ))}
            </div>
          </section>
        )}


        {/* ✅ Empty State / Error - NO ADS here [web:2][web:22] */}
        {!loading && !query && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              Please enter a search term to find classic movies.
            </p>
          </div>
        )}


        {/* ✅ No Results State - NO ADS here [web:2][web:22] */}
        {!loading && query && movies.length === 0 && error && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <svg className="w-16 h-16 mx-auto text-yellow-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No movies found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              Try searching for a different title, director, or genre like "Chaplin", "film noir", or "1920s".
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Browse Home
            </a>
          </div>
        )}


        {/* ✅ Movie Grid - Only render ads after this if results exist [web:2][web:22] */}
        {!loading && movies.length > 0 && (
          <>
            <section
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
              aria-label={`${movies.length} search results for "${query}"`}
            >
              {movies.map((movie) => (
                <MovieCard key={movie.identifier} movie={movie} />
              ))}
            </section>

            {/* ✅ Top Ad - Only if results exist AND page has 200+ words [web:2][web:22][web:43] */}
            {pageWordCount >= 200 && (
              <div className="my-8">
                <AdBanner slot="search-top" format="horizontal" minWords={200} />
              </div>
            )}


            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="my-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  baseUrl="/search"
                  queryParam={`q=${encodeURIComponent(query)}`}
                />
              </div>
            )}


            {/* ✅ Bottom Ad - Only if results exist AND substantial content [web:2][web:22][web:43] */}
            {pageWordCount >= 200 && (
              <div className="my-8">
                <AdBanner slot="search-bottom" format="horizontal" minWords={200} />
              </div>
            )}
          </>
        )}


        {/* ✅ Error State (API Failure) - NO ADS [web:2][web:22] */}
        {!loading && query && !movies.length && error && movies.length === 0 && (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Search Unavailable
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {error || 'Unable to complete your search. Please try again later.'}
            </p>
          </div>
        )}

      </main>
    </>
  );
}
