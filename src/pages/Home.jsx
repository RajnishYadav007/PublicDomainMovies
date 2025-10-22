import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import AdBanner from '../components/AdBanner';
import Pagination from '../components/Pagination';
import { searchByCategory } from '../utils/archiveAPI';

/**
 * Homepage - Featured Movies and Search
 * ✅ TanStack Query for data fetching
 * ✅ SEO-optimized hero section
 * ✅ AdSense policy compliant ad placement
 * ✅ Pagination and English-language filter (20 movies per page)
 * ✅ Browse categories section
 * ✅ Why Choose Us section
 * ✅ Legal disclaimer
 */
export default function Home() {
  // URL search params for pagination and sorting
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'downloads desc';
  const moviesPerPage = 20;

  // Use searchByCategory for English movies with pagination
  const {
    data: movieData = { movies: [], totalResults: 0, totalPages: 0 },
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['home-language-english', currentPage, sortBy],
    queryFn: async () => {
      const results = await searchByCategory(
        'language',
        'english',
        currentPage,
        moviesPerPage,
        sortBy
      );
      if (!results || typeof results !== 'object') throw new Error('Invalid API response format');
      return {
        movies: results.docs || [],
        totalResults: results.numFound || 0,
        totalPages: Math.ceil((results.numFound || 0) / moviesPerPage)
      };
    },
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const movies = movieData.movies;
  const totalPages = movieData.totalPages;
  const totalResults = movieData.totalResults;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: String(newPage), sort: sortBy });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setSearchParams({ page: '1', sort: e.target.value });
  };

  // Category configuration with proper routing
  const categories = [
    { name: 'Horror', type: 'genre', slug: 'horror', color: 'from-purple-600 to-purple-700' },
    { name: 'Comedy', type: 'genre', slug: 'comedy', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Drama', type: 'genre', slug: 'drama', color: 'from-red-600 to-red-700' },
    { name: 'Sci-Fi', type: 'genre', slug: 'sci-fi', color: 'from-blue-600 to-blue-700' },
    { name: '1920s', type: 'decade', slug: '1920s', color: 'from-gray-600 to-gray-700' },
    { name: '1930s', type: 'decade', slug: '1930s', color: 'from-gray-600 to-gray-700' },
    { name: '1940s', type: 'decade', slug: '1940s', color: 'from-gray-600 to-gray-700' },
    { name: '1950s', type: 'decade', slug: '1950s', color: 'from-gray-600 to-gray-700' }
  ];

  // Generate Website Schema
  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Archive Movies - Public Domain Classics",
    "url": import.meta.env.VITE_SITE_URL || "https://archive-movies.com",
    "description": "Watch free public domain classic movies online from Internet Archive. Stream vintage cinema from 1890s-1970s.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${import.meta.env.VITE_SITE_URL || "https://archive-movies.com"}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Archive Movies",
      "logo": {
        "@type": "ImageObject",
        "url": `${import.meta.env.VITE_SITE_URL}/logo.png`
      }
    }
  });

  return (
    <>
      {/* ✅ SEO Configuration with Direct Helmet */}
      <Helmet>
        <title>Watch Free Classic Public Domain Movies Online | Archive Movies</title>
        <meta 
          name="description" 
          content="Stream classic movies from 1890s-1970s free. Explore public domain films from Internet Archive - vintage cinema, horror, comedy, drama, sci-fi, and more." 
        />
        <meta 
          name="keywords" 
          content="watch classic movies online, free public domain movies, vintage cinema, old movies free, archive movies, silent films, classic horror, vintage comedy" 
        />
        <link rel="canonical" href={import.meta.env.VITE_SITE_URL || "https://archive-movies.com"} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Watch Free Classic Public Domain Movies Online" />
        <meta property="og:description" content="Stream vintage cinema from Internet Archive. All films verified public domain." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={import.meta.env.VITE_SITE_URL} />
        <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL}/og-image.jpg`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Watch Free Classic Public Domain Movies" />
        <meta name="twitter:description" content="Stream vintage cinema from 1890s-1970s. All films public domain." />
        <meta name="twitter:image" content={`${import.meta.env.VITE_SITE_URL}/og-image.jpg`} />
        
        {/* Structured Data - Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getWebsiteSchema())}
        </script>
      </Helmet>

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        
        {/* ✅ Hero Section - SEO Optimized */}
        <header className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              {/* ✅ H1 Tag for SEO - Most Important Keyword */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Watch Free Classic Movies Online
                <span className="block text-3xl md:text-4xl mt-2 text-blue-100">
                  Public Domain Films from Internet Archive
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-50 mb-8 leading-relaxed">
                Stream vintage cinema from 1890s-1970s. All films verified public domain.
                <span className="block mt-2 text-lg">
                  Horror, Comedy, Drama, Sci-Fi, Film Noir & More
                </span>
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <SearchBar />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">
                    {totalResults ? totalResults.toLocaleString() : '5,000+'}
                  </div>
                  <div className="text-blue-100 text-sm md:text-base">Classic Films</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">100%</div>
                  <div className="text-blue-100 text-sm md:text-base">Public Domain</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">Free</div>
                  <div className="text-blue-100 text-sm md:text-base">No Subscription</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          
          {/* ✅ AdSense Top Banner - Compliant Placement */}
          <div className="my-8">
            <AdBanner slot="1234567890" format="horizontal" />
          </div>

          {/* ✅ Featured Movies Section with Pagination & Sorting */}
          <section className="mb-12" aria-labelledby="featured-heading">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Featured Public Domain Movies
                </h2>
                {!isLoading && !isError && movieData && (
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, totalResults)} of {totalResults.toLocaleString()} English movies
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-4 lg:mt-0">
                <Link 
                  to="/categories" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium whitespace-nowrap"
                >
                  View All Categories →
                </Link>
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={handleSortChange}
                    disabled={isLoading}
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="downloads desc">Most Popular</option>
                    <option value="date desc">Newest Added</option>
                    <option value="title asc">Title (A-Z)</option>
                    <option value="year desc">Year (Newest)</option>
                    <option value="year asc">Year (Oldest)</option>
                  </select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              // Loading Skeleton - 20 items
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : isError ? (
              // Error State
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Failed to Load Movies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {error?.message || 'Unable to fetch movies. Please try again later.'}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : movies.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <div key={movie.identifier}>
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              // No Movies Available
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No featured movies available at the moment. Check back soon!
                </p>
              </div>
            )}
          </section>

          {/* ✅ AdSense Mid-Content Ad - Strategic Placement */}
          <div className="my-12">
            <AdBanner slot="slot-mid-content" format="rectangle" />
          </div>

          {/* ✅ Browse by Category Section */}
          <section className="mb-12" aria-labelledby="categories-heading">
            <h2 id="categories-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(category => (
                <Link
                  key={category.slug}
                  to={`/category/${category.type}/${category.slug}`}
                  className={`group bg-gradient-to-br ${category.color} hover:shadow-xl 
                           text-white text-center py-6 rounded-xl font-bold text-lg 
                           transition-all duration-300 transform hover:-translate-y-1
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
                  aria-label={`Browse ${category.name} movies`}
                >
                  <span className="block group-hover:scale-110 transition-transform">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/categories"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 
                         rounded-lg font-bold text-lg transition-colors shadow-md hover:shadow-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                View All Categories
              </Link>
            </div>
          </section>

          {/* ✅ Why Choose Us Section - SEO Content */}
          <section className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12" aria-labelledby="benefits-heading">
            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Watch Classic Movies Here?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  100% Legal & Free
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All movies verified public domain from Internet Archive. No copyright issues.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Massive Collection
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  5,000+ classic films from 1890s-1970s. Silent movies, horror, comedy, drama & more.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  No Subscription Required
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Watch unlimited classic movies anytime. No signup, no credit card, completely free.
                </p>
              </div>
            </div>
          </section>

          {/* ✅ AdSense Bottom Banner - Compliant Placement */}
          <div className="my-12">
            <AdBanner slot="0987654321" format="horizontal" />
          </div>

          {/* ✅ Legal Disclaimer - AdSense Compliance */}
          <aside className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6" role="note">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                  Content Rights Notice
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                  All movies are sourced from{' '}
                  <a 
                    href="https://archive.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-medium"
                  >
                    Internet Archive
                  </a>
                  {' '}and verified as public domain or Creative Commons licensed. 
                  Users should independently verify rights before redistribution. 
                  Learn more on our{' '}
                  <Link to="/about" className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-medium">
                    About page
                  </Link>.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}