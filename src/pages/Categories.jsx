import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Categories Landing Page
 * ✅ SEO-optimized with structured data
 * ✅ Accessible with ARIA labels
 * ✅ Responsive grid layout
 * Keywords: "classic movie categories", "public domain films by genre", "vintage movies by decade"
 */
export default function Categories() {
  // Genre configuration with metadata
  const genres = [
    { name: 'Horror', slug: 'horror', icon: '🧛', description: 'Classic horror and thriller films' },
    { name: 'Comedy', slug: 'comedy', icon: '😄', description: 'Vintage comedy and slapstick movies' },
    { name: 'Drama', slug: 'drama', icon: '🎭', description: 'Dramatic public domain films' },
    { name: 'Sci-Fi', slug: 'sci-fi', icon: '🚀', description: 'Science fiction classics' },
    { name: 'Western', slug: 'western', icon: '🤠', description: 'Old Western cowboy movies' },
    { name: 'Documentary', slug: 'documentary', icon: '📽️', description: 'Historical documentaries' },
    { name: 'Animation', slug: 'animation', icon: '🎨', description: 'Classic animated films' },
    { name: 'Film Noir', slug: 'film-noir', icon: '🕵️', description: 'Film noir detective movies' }
  ];

  // Decade configuration with metadata
  const decades = [
    { name: '1890s', slug: '1890s', description: 'Silent era beginnings' },
    { name: '1900s', slug: '1900s', description: 'Early cinema experiments' },
    { name: '1910s', slug: '1910s', description: 'Silent film golden age' },
    { name: '1920s', slug: '1920s', description: 'Jazz age cinema' },
    { name: '1930s', slug: '1930s', description: 'Depression era films' },
    { name: '1940s', slug: '1940s', description: 'Wartime cinema' },
    { name: '1950s', slug: '1950s', description: 'Golden age of Hollywood' },
    { name: '1960s', slug: '1960s', description: 'New wave cinema' },
    { name: '1970s', slug: '1970s', description: 'Modern cinema begins' }
  ];

  // Language configuration
  const languages = [
    { name: 'English', slug: 'english', icon: '🇬🇧', count: '2000+' },
    { name: 'Silent', slug: 'silent', icon: '🤫', count: '500+' },
    { name: 'French', slug: 'french', icon: '🇫🇷', count: '300+' },
    { name: 'German', slug: 'german', icon: '🇩🇪', count: '200+' },
    { name: 'Italian', slug: 'italian', icon: '🇮🇹', count: '150+' },
    { name: 'Spanish', slug: 'spanish', icon: '🇪🇸', count: '100+' }
  ];

  // Generate CollectionPage structured data
  const getStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Movie Categories - Browse by Genre, Decade & Language",
    "description": "Browse our collection of public domain classic movies organized by genre, decade, and language. Free vintage cinema from Internet Archive.",
    "url": `${import.meta.env.VITE_SITE_URL}/categories`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Archive Movies",
      "url": import.meta.env.VITE_SITE_URL
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": import.meta.env.VITE_SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Categories",
          "item": `${import.meta.env.VITE_SITE_URL}/categories`
        }
      ]
    }
  });

  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>Browse Movie Categories | Classic Films by Genre, Decade & Language</title>
        <meta 
          name="description" 
          content="Explore classic public domain movies organized by genre (Horror, Comedy, Drama, Sci-Fi), decade (1920s-1970s), and language. Free vintage cinema from Internet Archive." 
        />
        <meta 
          name="keywords" 
          content="movie categories, classic films by genre, vintage movies by decade, public domain movies, film noir, silent movies, horror classics, comedy films" 
        />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL}/categories`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Browse Movie Categories - Classic Public Domain Films" />
        <meta property="og:description" content="Discover classic movies by genre, decade, and language. Free public domain films from Internet Archive." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${import.meta.env.VITE_SITE_URL}/categories`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Browse Movie Categories - Classic Films" />
        <meta name="twitter:description" content="Explore classic movies by genre, decade, and language." />
        
        {/* Structured Data - CollectionPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      </Helmet>

      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-10">
          
          {/* Page Header */}
          <header className="mb-10">
            {/* Breadcrumb Navigation */}
            <nav className="text-sm text-gray-600 dark:text-gray-400 mb-3" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-2">
                <li>
                  <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2" aria-hidden="true">/</span>
                  <span className="text-gray-900 dark:text-white font-medium">Categories</span>
                </li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Browse Movie Categories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Explore our extensive collection of public domain classic films organized by genre, decade, and language. 
              All movies are legally available from Internet Archive.
            </p>
          </header>

          {/* Genres Section */}
          <section className="mb-12" aria-labelledby="genres-heading">
            <div className="flex items-center justify-between mb-5">
              <h2 id="genres-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Browse by Genre
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {genres.length} genres
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map(genre => (
                <Link
                  key={genre.slug}
                  to={`/category/genre/${genre.slug}`}
                  className="group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                           text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                           transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Browse ${genre.name} movies - ${genre.description}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl" aria-hidden="true">{genre.icon}</span>
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{genre.name}</h3>
                  <p className="text-blue-100 text-sm">{genre.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Decades Section */}
          <section className="mb-12" aria-labelledby="decades-heading">
            <div className="flex items-center justify-between mb-5">
              <h2 id="decades-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Browse by Decade
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {decades.length} decades
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {decades.map(decade => (
                <Link
                  key={decade.slug}
                  to={`/category/decade/${decade.slug}`}
                  className="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                           border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400
                           p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 
                           transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Browse ${decade.name} movies - ${decade.description}`}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 
                                 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {decade.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {decade.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section className="mb-12" aria-labelledby="languages-heading">
            <div className="flex items-center justify-between mb-5">
              <h2 id="languages-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Browse by Language
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {languages.length} languages
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {languages.map(lang => (
                <Link
                  key={lang.slug}
                  to={`/category/language/${lang.slug}`}
                  className="group bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 
                           hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600
                           p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                           transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label={`Browse ${lang.name} language movies - ${lang.count} films available`}
                >
                  <div className="text-center">
                    <span className="text-3xl mb-2 block" aria-hidden="true">{lang.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 
                                 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {lang.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lang.count} films
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
              Use our advanced search to discover thousands of public domain classic films by title, actor, or director.
            </p>
            <Link
              to="/search"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg 
                       hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Search All Movies
            </Link>
          </section>

          {/* Legal Notice */}
          <aside className="mt-10 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 
                          rounded-lg p-6" role="note">
            <div className="flex items-start gap-3">
              <svg 
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clipRule="evenodd" 
                />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                  Public Domain Content Notice
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 leading-relaxed">
                  All movies in our collection are sourced from{' '}
                  <a 
                    href="https://archive.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-medium"
                  >
                    Internet Archive
                  </a>
                  {' '}and marked as public domain or Creative Commons licensed. 
                  While we verify licensing status, users should independently confirm rights before redistribution. 
                  Learn more on our{' '}
                  <Link 
                    to="/about" 
                    className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-medium"
                  >
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
