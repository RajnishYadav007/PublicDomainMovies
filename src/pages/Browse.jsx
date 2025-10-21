import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFeaturedMovies } from '../hooks/useArchiveAPI';

/**
 * Browse Page - Movie Discovery Hub
 * ✅ Features:
 * - Quick category navigation
 * - Featured movies grid
 * - Popular decades
 * - Search shortcuts
 * - SEO optimized
 */
export default function Browse() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://archive-movies.com';
  
  // Fetch featured movies
  const { data: featuredData, isLoading } = useFeaturedMovies(12);
  const featuredMovies = featuredData?.docs || [];

  // Quick browse categories
  const quickCategories = [
    {
      type: 'genre',
      items: [
        { name: 'Horror', slug: 'horror', icon: '🧛', description: 'Classic horror & monster films' },
        { name: 'Comedy', slug: 'comedy', icon: '😂', description: 'Silent & talking comedies' },
        { name: 'Drama', slug: 'drama', icon: '🎭', description: 'Dramatic masterpieces' },
        { name: 'Sci-Fi', slug: 'sci-fi', icon: '🚀', description: 'Vintage science fiction' },
        { name: 'Western', slug: 'western', icon: '🤠', description: 'Classic westerns' },
        { name: 'Film Noir', slug: 'film-noir', icon: '🕵️', description: 'Dark crime thrillers' },
        { name: 'Animation', slug: 'animation', icon: '🎬', description: 'Early animated films' },
        { name: 'Documentary', slug: 'documentary', icon: '📽️', description: 'Historical documentaries' }
      ]
    },
    {
      type: 'decade',
      items: [
        { name: '1890s', slug: '1890s', count: '5+', description: 'Dawn of cinema' },
        { name: '1900s', slug: '1900s', count: '20+', description: 'Early silent era' },
        { name: '1920s', slug: '1920s', count: '100+', description: 'Silent film golden age' },
        { name: '1930s', slug: '1930s', count: '500+', description: 'Talkies begin' },
        { name: '1940s', slug: '1940s', count: '800+', description: 'Film noir era' },
        { name: '1950s', slug: '1950s', count: '1000+', description: 'Golden age of Hollywood' },
        { name: '1960s', slug: '1960s', count: '1200+', description: 'New Hollywood movement' }
      ]
    }
  ];

  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>Browse Classic Movies | Archive Movies</title>
        <meta 
          name="description" 
          content="Browse thousands of free public domain classic movies. Explore by genre, decade, or search for your favorite vintage films from 1890s-1970s." 
        />
        <meta 
          name="keywords" 
          content="browse classic movies, public domain films, vintage cinema, old movies free, silent films, golden age hollywood" 
        />
        <link rel="canonical" href={`${siteUrl}/browse`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Browse Classic Movies | Archive Movies" />
        <meta property="og:description" content="Explore thousands of free public domain classic films" />
        <meta property="og:url" content={`${siteUrl}/browse`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Browse Classic Movies",
            "description": "Browse public domain classic movies by genre and decade",
            "url": `${siteUrl}/browse`,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Archive Movies",
              "url": siteUrl
            }
          })}
        </script>
      </Helmet>

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Browse Classic Movies
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover thousands of free public domain films from the golden age of cinema
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <Link
                to="/search"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 
                         rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors
                         shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Movies
              </Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          
          {/* Browse by Genre */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Browse by Genre
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore movies by your favorite genre
                </p>
              </div>
              <Link
                to="/categories"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium
                         focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {quickCategories[0].items.map(genre => (
                <Link
                  key={genre.slug}
                  to={`/category/genre/${genre.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md 
                           hover:shadow-xl transition-all group border-2 border-gray-200 
                           dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {genre.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 
                               group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {genre.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by Decade */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Browse by Decade
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Travel through cinema history
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {quickCategories[1].items.map(decade => (
                <Link
                  key={decade.slug}
                  to={`/category/decade/${decade.slug}`}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 
                           dark:to-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl 
                           transition-all text-center group border-2 border-transparent
                           hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2
                               group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {decade.name}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {decade.count} films
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {decade.description}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Movies */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Featured Movies
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Popular classics from our collection
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[2/3] animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {featuredMovies.map(movie => (
                  <Link
                    key={movie.identifier}
                    to={`/movie/${movie.identifier}`}
                    className="group"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md 
                                  group-hover:shadow-xl transition-shadow bg-gray-200 dark:bg-gray-800">
                      <img
                        src={`https://archive.org/services/img/${movie.identifier}`}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-bold text-sm line-clamp-2 mb-1">
                            {movie.title}
                          </h3>
                          {movie.year && (
                            <p className="text-xs text-gray-300">{movie.year}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                           rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Use our advanced search to find specific movies by title, director, or year
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 
                       rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors
                       shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Advanced Search
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
