import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async'; // ✅ Direct import
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchByCategory } from '../utils/archiveAPI';

/**
 * Category Page - Browse movies by genre, decade, or language
 * ✅ OPTIMIZED: TanStack Query + React Helmet + SEO
 * SEO Keywords: "classic movies by genre", "public domain films decade"
 */
export default function CategoryPage() {
  const { categoryType, categoryValue } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'downloads desc';
  
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

  // ✅ TanStack Query with Enhanced Error Handling
  const { 
    data: movieData, 
    isLoading, 
    isError,
    error,
    refetch // ✅ Added refetch function
  } = useQuery({
    queryKey: ['category-movies', categoryType, categoryValue, currentPage, sortBy],
    queryFn: async () => {
      try {
        // LEGAL REVIEW REQUIRED: Verify Archive.org items are public domain
        const results = await searchByCategory(
          categoryType, 
          categoryValue, 
          currentPage,
          moviesPerPage,
          sortBy
        );
        
        // ✅ Validate response structure
        if (!results || typeof results !== 'object') {
          throw new Error('Invalid API response format');
        }
        
        return {
          movies: results.docs || [],
          totalPages: Math.ceil((results.numFound || 0) / moviesPerPage),
          totalResults: results.numFound || 0
        };
      } catch (err) {
        // ✅ Enhanced error handling with custom error messages
        console.error('Archive.org API Error:', err);
        throw new Error(
          err.message || 'Failed to fetch movies from Archive.org. Please try again.'
        );
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    retry: 2, // Retry failed requests twice
    refetchOnWindowFocus: false, // AdSense optimization
    // ✅ Add enabled condition to prevent unnecessary calls
    enabled: Boolean(categoryType && categoryValue),
  });

  const movies = movieData?.movies || [];
  const totalPages = movieData?.totalPages || 0;
  const totalResults = movieData?.totalResults || 0;

  // ✅ Optimized pagination handler with URL state sync
  const handlePageChange = (newPage) => {
    setSearchParams({ 
      page: String(newPage), 
      sort: sortBy 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Optimized sort handler
  const handleSortChange = (e) => {
    setSearchParams({ 
      page: '1', 
      sort: e.target.value 
    });
  };

  // ✅ Enhanced title generation with proper capitalization
  const getCategoryTitle = () => {
    if (!categoryValue) return 'Movies';
    
    const formattedValue = categoryValue
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return `${formattedValue} Movies`;
  };

  // ✅ SEO-optimized description generator
  const getCategoryDescription = () => {
    const formattedCategory = categoryValue?.replace(/-/g, ' ') || 'classic';
    return `Watch free ${formattedCategory} classic movies online. Stream public domain films from Internet Archive. Legal vintage cinema from ${categoryType === 'decade' ? 'the ' + categoryValue : categoryValue}.`;
  };

  // ✅ Generate structured breadcrumb schema
  const getBreadcrumbSchema = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": import.meta.env.VITE_SITE_URL || "https://archive-movies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": `${import.meta.env.VITE_SITE_URL}/categories`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": getCategoryTitle(),
        "item": `${import.meta.env.VITE_SITE_URL}/category/${categoryType}/${categoryValue}`
      }
    ]
  });

  return (
    <>
      {/* ✅ FIXED: Direct Helmet usage instead of SEO component wrapper */}
      <Helmet>
        <title>{`${getCategoryTitle()} - Free Classic Films | Public Domain Movies`}</title>
        <meta name="description" content={getCategoryDescription()} />
        <meta 
          name="keywords" 
          content={`${categoryValue} movies, classic ${categoryValue} films, public domain ${categoryValue}, free vintage movies, archive movies ${categoryValue}`} 
        />
        <link 
          rel="canonical" 
          href={`${import.meta.env.VITE_SITE_URL}/category/${categoryType}/${categoryValue}`} 
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${getCategoryTitle()} - Free Classic Films`} />
        <meta property="og:description" content={getCategoryDescription()} />
        <meta property="og:type" content="website" />
        <meta 
          property="og:url" 
          content={`${import.meta.env.VITE_SITE_URL}/category/${categoryType}/${categoryValue}`} 
        />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${getCategoryTitle()} - Free Classic Films`} />
        <meta name="twitter:description" content={getCategoryDescription()} />
        
        {/* Structured Data - Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbSchema())}
        </script>
        
        {/* ✅ Collection Page Schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": getCategoryTitle(),
            "description": getCategoryDescription(),
            "url": `${import.meta.env.VITE_SITE_URL}/category/${categoryType}/${categoryValue}`,
            "numberOfItems": totalResults
          })}
        </script>
      </Helmet>

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                {/* Breadcrumb Navigation */}
                <nav className="text-sm text-gray-600 dark:text-gray-400 mb-2" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1">
                    <li>
                      <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <span className="mx-2" aria-hidden="true">/</span>
                      <Link to="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <span className="mx-2" aria-hidden="true">/</span>
                      <span className="capitalize">{categoryNames[categoryType] || categoryType}</span>
                    </li>
                    <li>
                      <span className="mx-2" aria-hidden="true">/</span>
                      <span className="text-gray-900 dark:text-white font-medium capitalize">
                        {categoryValue?.replace(/-/g, ' ')}
                      </span>
                    </li>
                  </ol>
                </nav>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {getCategoryTitle()}
                </h1>
                
                {!isLoading && movies.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Found <strong>{totalResults.toLocaleString()}</strong> public domain movies
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
                  disabled={isLoading} // ✅ Disable during loading
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 
                           rounded-md bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Sort movies"
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
            
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0" aria-label="Category filters">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:sticky lg:top-20">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Filters
                </h2>

                {/* Quick Genre Links */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Genres
                  </h3>
                  <ul className="space-y-2" role="list">
                    {filterOptions.genres.map(genre => {
                      const genreSlug = genre.toLowerCase().replace(/\s+/g, '-');
                      const isActive = categoryType === 'genre' && categoryValue === genreSlug;
                      
                      return (
                        <li key={genre}>
                          <Link
                            to={`/category/genre/${genreSlug}`}
                            className={`text-sm transition-colors block py-1 ${
                              isActive 
                                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {genre}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Quick Decade Links */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Decades
                  </h3>
                  <ul className="space-y-2" role="list">
                    {filterOptions.decades.slice(3, 9).map(decade => {
                      const decadeSlug = decade.toLowerCase();
                      const isActive = categoryType === 'decade' && categoryValue === decadeSlug;
                      
                      return (
                        <li key={decade}>
                          <Link
                            to={`/category/decade/${decadeSlug}`}
                            className={`text-sm transition-colors block py-1 ${
                              isActive 
                                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {decade}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Languages
                  </h3>
                  <ul className="space-y-2" role="list">
                    {filterOptions.languages.slice(0, 5).map(lang => {
                      const langSlug = lang.toLowerCase();
                      const isActive = categoryType === 'language' && categoryValue === langSlug;
                      
                      return (
                        <li key={lang}>
                          <Link
                            to={`/category/language/${langSlug}`}
                            className={`text-sm transition-colors block py-1 ${
                              isActive 
                                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {lang}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* LEGAL NOTICE: AdSense Compliance */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    <strong className="font-semibold block mb-1">Rights Verification:</strong>
                    All content sourced from Internet Archive.{' '}
                    <Link 
                      to="/about" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Verify Rights on Archive.org
                    </Link>
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1" role="main">
              {isLoading ? (
                // Loading State - Skeleton UI
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-busy="true" aria-label="Loading movies">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : isError ? (
                // ✅ Enhanced Error State with Retry Button
                <div className="text-center py-16 bg-red-50 dark:bg-red-900/10 rounded-lg" role="alert">
                  <svg 
                    className="w-16 h-16 mx-auto text-red-500 dark:text-red-400 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Failed to Load Movies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    {error?.message || 'Unable to fetch movies from Archive.org. Please check your connection and try again.'}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => refetch()} // ✅ Use refetch instead of reload
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Retry
                    </button>
                    <Link
                      to="/"
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Go Home
                    </Link>
                  </div>
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
                // No Results State
                <div className="text-center py-16">
                  <svg 
                    className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Movies Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any public domain movies in this category.
                  </p>
                  <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Explore All Movies
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
