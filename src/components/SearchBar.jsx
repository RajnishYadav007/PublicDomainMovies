import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { searchPublicDomainMovies } from '../utils/archiveAPI';

/**
 * Advanced SearchBar with Autocomplete
 * ✅ Features:
 * - Debounced search (400ms delay for performance)
 * - Autocomplete suggestions with thumbnails
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Recent searches (localStorage with 5 max)
 * - Loading states with spinner
 * - Accessibility (ARIA labels, roles)
 * - Click outside to close
 * - Clear button
 */
export default function SearchBar({ autoFocus = false, placeholder }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  // Debounced query - 400ms delay ke baad fire hoga
  const debouncedQuery = useDebounce(query, 400);

  // Default placeholder text
  const defaultPlaceholder = placeholder || 'Search classic movies... (Dracula, Chaplin, Nosferatu)';

  // ============================================
  // EFFECTS
  // ============================================

  // Component mount hone pe recent searches load karo
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that it's an array
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
      localStorage.removeItem('recentSearches');
    }
  }, []);

  // Debounced query change hone pe suggestions fetch karo
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
      if (debouncedQuery.trim().length === 0) {
        setShowSuggestions(false);
      }
    }
  }, [debouncedQuery]);

  // Auto-focus if prop passed
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle click outside - dropdown close karo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Fetch autocomplete suggestions from Archive.org
   */
  const fetchSuggestions = async (searchQuery) => {
    setLoading(true);
    try {
      const results = await searchPublicDomainMovies(searchQuery, 1, 5);
      setSuggestions(results.docs || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Autocomplete fetch error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle search submission
   */
  const handleSearch = (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    // Recent searches mein add karo
    saveRecentSearch(trimmedQuery);

    // Search results page pe navigate karo
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    
    // Reset states
    setShowSuggestions(false);
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  /**
   * Save search to recent searches (localStorage)
   * Maximum 5 recent searches maintain karo
   */
  const saveRecentSearch = (searchQuery) => {
    try {
      const updated = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5); // Maximum 5 recent searches

      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  };

  /**
   * Clear a specific recent search
   */
  const clearRecentSearch = (searchToRemove, event) => {
    event.stopPropagation(); // Prevent triggering the search
    
    try {
      const updated = recentSearches.filter(s => s !== searchToRemove);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to clear recent search:', error);
    }
  };

  /**
   * Clear all recent searches
   */
  const clearAllRecentSearches = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem('recentSearches');
      setShowSuggestions(false);
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
  };

  /**
   * Handle form submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Agar koi suggestion selected hai, use wala use karo
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSearch(suggestions[selectedIndex].title);
    } else {
      handleSearch(query);
    }
  };

  /**
   * Handle keyboard navigation (Arrow keys, Enter, Escape)
   */
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;

      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;

      case 'Enter':
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          e.preventDefault();
          handleSearch(suggestions[selectedIndex].title);
        }
        break;

      default:
        break;
    }
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.title);
  };

  /**
   * Clear input
   */
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  /**
   * Handle input focus - recent searches dikhao agar query empty hai
   */
  const handleFocus = () => {
    if (!query && recentSearches.length > 0) {
      setShowSuggestions(true);
    } else if (query.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    
    // Reset selected index when typing
    setSelectedIndex(-1);
    
    // Show suggestions if query is long enough
    if (newValue.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} role="search">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 text-gray-400 pointer-events-none">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={defaultPlaceholder}
            className="w-full pl-12 pr-24 py-3 border-2 border-gray-300 rounded-lg 
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                       dark:bg-gray-800 dark:border-gray-600 dark:text-white
                       dark:placeholder-gray-400
                       transition-all"
            aria-label="Search movies"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={showSuggestions}
            aria-activedescendant={
              selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
            }
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear Button (only show when there's text) */}
          {query && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 text-gray-400 hover:text-gray-600 
                         dark:hover:text-gray-300 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
              aria-label="Clear search"
              tabIndex={-1}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute right-20 text-blue-500" aria-label="Loading suggestions">
              <svg 
                className="animate-spin h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="absolute right-2 bg-blue-600 hover:bg-blue-700 
                       text-white px-6 py-2 rounded-md font-semibold
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={!query.trim() || loading}
            aria-label="Submit search"
          >
            Search
          </button>
        </div>
      </form>

      {/* Autocomplete Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          id="search-suggestions"
          className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 
                     border-2 border-gray-200 dark:border-gray-700 
                     rounded-lg shadow-xl max-h-96 overflow-y-auto"
          role="listbox"
          aria-label="Search suggestions"
        >
          {/* Recent Searches Section */}
          {!query && recentSearches.length > 0 && (
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Recent Searches
                </span>
                <button
                  onClick={clearAllRecentSearches}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline
                           focus:outline-none focus:ring-1 focus:ring-blue-400 rounded px-2 py-1"
                  aria-label="Clear all recent searches"
                >
                  Clear All
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={`recent-${index}`}
                  onClick={() => handleSearch(search)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100 
                             dark:hover:bg-gray-700 flex items-center justify-between gap-3
                             transition-colors group
                             focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                  role="option"
                  aria-selected={false}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <svg 
                      className="w-4 h-4 text-gray-400 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 truncate">{search}</span>
                  </div>
                  
                  {/* Delete button */}
                  <button
                    onClick={(e) => clearRecentSearch(search, e)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500
                             transition-opacity p-1 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                    aria-label={`Remove ${search} from recent searches`}
                    tabIndex={-1}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </button>
              ))}
            </div>
          )}

          {/* Movie Suggestions */}
          {suggestions.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Suggestions
              </div>
              {suggestions.map((movie, index) => (
                <button
                  key={movie.identifier}
                  id={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(movie)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-4
                             transition-colors
                             focus:outline-none
                             ${selectedIndex === index 
                               ? 'bg-blue-50 dark:bg-blue-900/50' 
                               : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                             }`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  {/* Movie Thumbnail */}
                  <img
                    src={`https://archive.org/services/img/${movie.identifier}`}
                    alt={`${movie.title} poster`}
                    className="w-12 h-16 object-cover rounded flex-shrink-0"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/placeholder-movie.jpg'; // Fallback image
                    }}
                  />
                  
                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {movie.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {movie.year && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {movie.year}
                        </span>
                      )}
                      {movie.creator && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {movie.creator}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <svg 
                    className="w-5 h-5 text-gray-400 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              ))}
            </>
          )}

          {/* No Results */}
          {query && !loading && suggestions.length === 0 && debouncedQuery === query && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              <svg 
                className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  clipRule="evenodd" 
                />
              </svg>
              <p className="font-semibold mb-1 text-gray-700 dark:text-gray-300">
                No movies found for "{query}"
              </p>
              <p className="text-sm">
                Try a different search term or browse our <a href="/categories" className="text-blue-600 hover:underline">categories</a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
