import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DMCA from './pages/DMCA';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';

/**
 * Main App Component
 * Routing setup with React Router v7
 */
function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Header with Navigation */}
          <Header />
          
          {/* Main Content Area */}
          <main className="flex-1">
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<Home />} />
              
              {/* Static Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/dmca" element={<DMCA />} />
              
              {/* Search & Browse */}
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movie/:slug" element={<MovieDetail />} />
              
              {/* Category Pages */}
              <Route path="/category/:categoryType/:categoryValue" element={<CategoryPage />} />
              
              {/* 404 - Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

// 404 Page Component
function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
      <a
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block"
      >
        Back to Home
      </a>
    </div>
  );
}

export default App;
