import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import RightsWarning from './components/RightsWarning';
import ScrollToTop from './components/ScrollToTop'; // ✅ ADD THIS


// Page Imports
import Home from './pages/Home';
import Browse from './pages/Browse';
import About from './pages/About';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DMCA from './pages/DMCA';
import Sitemap from './pages/Sitemap';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import FAQ from './pages/FAQ';


function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        
        <meta 
          name="description" 
          content="Watch free public domain classic movies online. Stream vintage films from 1890s-1970s legally from Internet Archive." 
        />
        <meta 
          name="keywords" 
          content="public domain movies, classic films free, vintage cinema, archive movies online, watch old movies free" 
        />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Archive Movies - Public Domain Classics",
            "url": import.meta.env.VITE_SITE_URL || "https://publicdomainmovie.vercel.app",
            "description": "Watch free public domain classic movies online from Internet Archive",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${import.meta.env.VITE_SITE_URL || "https://publicdomainmovie.vercel.app"}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      {/* ✅ ADD ScrollToTop component HERE - after Router but before content */}
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none 
                   focus:ring-2 focus:ring-blue-400"
        >
          Skip to main content
        </a>

        <Header />
        <RightsWarning />
        
        <main 
          id="main-content" 
          className="flex-1" 
          role="main"
          aria-label="Main content"
        >
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />
            
            {/* Browse Page */}
            <Route path="/browse" element={<Browse />} />
            
            {/* Categories Landing Page */}
            <Route path="/categories" element={<Categories />} />
            
            {/* Search Results */}
            <Route path="/search" element={<SearchResults />} />
            
            {/* Movie Detail */}
            <Route path="/movie/:slug" element={<MovieDetail />} />
            
            {/* Category Pages */}
            <Route 
              path="/category/:categoryType/:categoryValue" 
              element={<CategoryPage />} 
            />
            
            {/* Legal Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </>
  );
}


function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Archive Movies</title>
        <meta 
          name="description" 
          content="The requested page could not be found. Browse our collection of public domain classic movies." 
        />
        <meta name="robots" content="noindex, follow" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "404 Not Found",
            "description": "The requested page could not be found"
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-16 text-center" role="alert">
        <svg 
          className="w-32 h-32 mx-auto text-gray-300 dark:text-gray-600 mb-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>

        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Browse our collection of public domain classic movies below.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 
                     rounded-lg font-semibold inline-block transition-colors 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back to Home
          </Link>
          
          <Link
            to="/search"
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 
                     dark:hover:bg-gray-600 text-gray-900 dark:text-white 
                     px-8 py-3 rounded-lg font-semibold inline-block transition-colors
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Search Movies
          </Link>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Popular Categories
          </h3>
          <nav 
            className="flex flex-wrap justify-center gap-3" 
            aria-label="Popular movie categories"
          >
            {[
              { name: 'Horror', path: '/category/genre/horror' },
              { name: 'Comedy', path: '/category/genre/comedy' },
              { name: 'Sci-Fi', path: '/category/genre/sci-fi' },
              { name: 'Drama', path: '/category/genre/drama' },
              { name: '1920s', path: '/category/decade/1920s' },
              { name: '1950s', path: '/category/decade/1950s' },
              { name: '1960s', path: '/category/decade/1960s' },
              { name: 'Film Noir', path: '/category/genre/film-noir' }
            ].map(category => (
              <Link
                key={category.path}
                to={category.path}
                className="text-blue-600 dark:text-blue-400 hover:underline 
                         text-sm px-3 py-1 rounded-md hover:bg-blue-50 
                         dark:hover:bg-gray-800 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          <Link
            to="/categories"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium
                     focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
