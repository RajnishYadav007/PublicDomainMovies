import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom'; // ✅ Add Link import
import SEO from '../components/SEO';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchByCategory } from '../utils/archiveAPI';

/**
 * Category Page - Browse movies by genre, decade, or language
 * FIXED: Replaced all <a> tags with <Link> for proper React Router navigation
 */
export default function CategoryPage() {
  const { categoryType, categoryValue } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'downloads';
  
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const moviesPerPage = 20;

  // Category display names
  const categoryNames = {
    genre: 'Genre',
    decade: 'Decade',
    year: 'Year',
    language: 'Language'
  };

  // Available filters
  const filterOptions = {
    decades: ['1890s', '1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s'],
    genres: ['Horror', 'Comedy', 'Drama', 'Sci-Fi', 'Western', 'Film Noir', 'Documentary', 'Animation'],
    languages: ['English', 'Silent', 'French', 'German', 'Italian', 'Spanish', 'Japanese']
  };

  useEffect(() => {
    loadMovies();
  }, [categoryType, categoryValue, currentPage, sortBy]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const results = await searchByCategory(
        categoryType, 
        categoryValue, 
        currentPage,
        moviesPerPage,
        sortBy
      );
      
      setMovies(results.docs || []);
      setTotalPages(Math.ceil((results.numFound || 0) / moviesPerPage));
    } catch (error) {
      console.error('Category load error:', error);
      setMovies([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, sort: sortBy });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setSearchParams({ page: 1, sort: e.target.value });
  };

  const getCategoryTitle = () => {
    const formattedValue = categoryValue.replace(/-/g, ' ');
    return `${formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1)} Movies`;
  };

  const getCategoryDescription = () => {
    return `Browse public domain ${categoryValue} movies. Watch classic films online free from Internet Archive.`;
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle()} - Free Classic Films`}
        description={getCategoryDescription()}
        canonical={`${import.meta.env.VITE_SITE_URL}/category/${categoryType}/${categoryValue}`}
      />

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <nav className="text-sm text-gray-600 dark:text-gray-400 mb-2" aria-label="Breadcrumb">
                  {/* ✅ FIXED: Changed <a> to <Link> */}
                  <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Categories
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="capitalize">{categoryNames[categoryType] || categoryType}</span>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 dark:text-white font-medium capitalize">
                    {categoryValue.replace(/-/g, ' ')}
                  </span>
                </nav>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {getCategoryTitle()}
                </h1>
                
                {!loading && movies.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Found <strong>{movies.length > 0 ? totalPages * moviesPerPage : 0}</strong> movies
                  </p>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <label 
                  htmlFor="sort" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 
                           rounded-md bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="downloads desc">Most Popular</option>
                  <option value="date desc">Newest Added</option>
                  <option value="title asc">Title (A-Z)</option>
                  <option value="year desc">Year (Newest)</option>
                  <option value="year asc">Year (Oldest)</option>
                </select>
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* ✅ FIXED SIDEBAR: All <a> tags replaced with <Link> */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Filters
                </h2>

                {/* Quick Genre Links */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
                    Genres
                  </h3>
                  <ul className="space-y-2">
                    {filterOptions.genres.slice(0, 6).map(genre => (
                      <li key={genre}>
                        {/* ✅ FIXED: Changed <a> to <Link> */}
                        <Link
                          to={`/category/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors block"
                        >
                          {genre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Decade Links */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
                    Decades
                  </h3>
                  <ul className="space-y-2">
                    {filterOptions.decades.slice(3, 9).map(decade => (
                      <li key={decade}>
                        {/* ✅ FIXED: Changed <a> to <Link> */}
                        <Link
                          to={`/category/decade/${decade.toLowerCase()}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors block"
                        >
                          {decade}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
                    Languages
                  </h3>
                  <ul className="space-y-2">
                    {filterOptions.languages.slice(0, 5).map(lang => (
                      <li key={lang}>
                        {/* ✅ FIXED: Changed <a> to <Link> */}
                        <Link
                          to={`/category/language/${lang.toLowerCase()}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors block"
                        >
                          {lang}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {loading ? (
                // Loading State
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"
                    />
                  ))}
                </div>
              ) : movies.length > 0 ? (
                <>
                  {/* Movie Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map(movie => (
                      <MovieCard key={movie.identifier} movie={movie} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      baseUrl={`/category/${categoryType}/${categoryValue}`}
                    />
                  )}
                </>
              ) : (
                // No Results
                <div className="text-center py-16">
                  <svg 
                    className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Movies Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any movies in this category.
                  </p>
                  {/* ✅ FIXED: Changed <a> to <Link> */}
                  <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </main>
          </div>

        </div>
      </div>
    </>
  );
}
