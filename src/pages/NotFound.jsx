import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

/**
 * 404 Not Found Page
 * ✅ CRITICAL: NO ADS allowed on error pages (AdSense policy violation) [web:2][web:22]
 * ✅ SEO-optimized with semantic HTML
 * ✅ Helpful navigation and search suggestions
 * ✅ Brand consistency maintained
 */
export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Archive Movies"
        description="The page you're looking for doesn't exist. Return to Archive Movies homepage to browse free public domain classic films."
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          
          {/* 404 Graphic */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-2">
              404
            </h1>
            <div className="flex justify-center mb-6">
              <svg 
                className="w-32 h-32 text-gray-400 dark:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            It might have been removed, renamed, or the URL may be incorrect.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </Link>
            
            <Link 
              to="/browse" 
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Browse Movies
            </Link>
          </div>

          {/* Helpful Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              What can you do?
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Use the search bar above to find specific classic movies</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Browse by <Link to="/categories" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">genre or decade</Link> to discover films
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>
                  Check our <Link to="/about" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">About page</Link> to learn more about Archive Movies
                </span>
              </li>
            </ul>
          </div>

          {/* ✅ CRITICAL: NO AdBanner component here - error pages MUST NOT show ads [web:2][web:22] */}

        </div>
      </div>
    </>
  );
}
