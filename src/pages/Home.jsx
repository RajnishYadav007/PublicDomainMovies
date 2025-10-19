import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import AdBanner from '../components/AdBanner';
import { getFeaturedMovies } from '../utils/archiveAPI';
import { generateWebsiteSchema } from '../utils/schemaGenerator';

/**
 * Homepage with featured movies and search
 * SEO keywords: "watch classic movies online", "free public domain movies"
 */
export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedMovies();
  }, []);

  const loadFeaturedMovies = async () => {
    try {
      const result = await getFeaturedMovies(12);
      setFeaturedMovies(result.docs);
    } catch (error) {
      console.error('Failed to load featured movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <SEO
        title="Watch Free Classic Public Domain Movies Online"
        description="Stream classic movies from 1920s-1960s free. Explore public domain films from Internet Archive - vintage cinema, horror, comedy, drama, and more."
        canonical={import.meta.env.VITE_SITE_URL}
        schemaMarkup={websiteSchema}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Classic Movies Online - Free Public Domain Films
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Watch vintage movies from Internet Archive. All films verified public domain.
          </p>
          <SearchBar />
        </section>

        {/* Top Banner Ad */}
        <AdBanner slot="1234567890" format="horizontal" />

        {/* Featured Movies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Public Domain Movies
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredMovies.map((movie, index) => (
                <div key={movie.identifier}>
                  <MovieCard movie={movie} />
                  {/* Ad after every 3 movies */}
                  {(index + 1) % 3 === 0 && index < featuredMovies.length - 1 && (
                    <div className="col-span-full my-6">
                      <AdBanner slot={`slot-${index}`} format="rectangle" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Horror', 'Comedy', 'Drama', 'Sci-Fi', '1920s', '1930s', '1940s', '1950s'].map(category => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-lg font-semibold transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Ad */}
        <AdBanner slot="0987654321" format="horizontal" />
      </div>
    </>
  );
}
