import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import RightsWarning from '../components/RightsWarning';
import AdBanner from '../components/AdBanner';
import { getMovieMetadata, getMovieFiles, searchPublicDomainMovies } from '../utils/archiveAPI';
import { generateMovieSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { parseMovieSlug } from '../utils/slugify';

/**
 * Movie detail page with streaming embed, metadata, and download links
 * SEO-optimized with full structured data
 */
export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    loadMovieData();
  }, [slug]);

  const loadMovieData = async () => {
    try {
      const { titleSlug, year } = parseMovieSlug(slug);
      
      // Search to find identifier
      const searchQuery = year ? `${titleSlug} ${year}` : titleSlug;
      const results = await searchPublicDomainMovies(searchQuery, 1, 1);
      
      if (results.docs.length === 0) {
        throw new Error('Movie not found');
      }

      const identifier = results.docs[0].identifier;
      const [metadata, movieFiles] = await Promise.all([
        getMovieMetadata(identifier),
        getMovieFiles(identifier)
      ]);

      setMovie({ ...metadata, identifier });
      setFiles(movieFiles);

      // Load related movies
      if (metadata.subject) {
        const genre = Array.isArray(metadata.subject) ? metadata.subject[0] : metadata.subject;
        const related = await searchPublicDomainMovies(genre, 1, 4);
        setRelatedMovies(related.docs.filter(m => m.identifier !== identifier));
      }
    } catch (error) {
      console.error('Failed to load movie:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!movie) {
    return <div className="container mx-auto px-4 py-8">Movie not found</div>;
  }

  const movieSchema = generateMovieSchema(movie);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: import.meta.env.VITE_SITE_URL },
    { name: 'Movies', url: `${import.meta.env.VITE_SITE_URL}/search` },
    { name: movie.title, url: `${import.meta.env.VITE_SITE_URL}/movie/${slug}` }
  ]);

  const hasPublicDomainLicense = movie.licenseurl && 
    (movie.licenseurl.includes('publicdomain') || movie.licenseurl.includes('cc0'));

  const pageTitle = movie.year 
    ? `${movie.title} (${movie.year}) - Watch Free Classic Movie Online`
    : `${movie.title} - Watch Free Classic Movie Online`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={movie.description || `Watch ${movie.title} free online. Classic public domain movie from Internet Archive.`}
        canonical={`${import.meta.env.VITE_SITE_URL}/movie/${slug}`}
        ogImage={`https://archive.org/services/img/${movie.identifier}`}
        schemaMarkup={[movieSchema, breadcrumbSchema]}
        type="video.movie"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Rights Warning */}
        {!hasPublicDomainLicense && (
          <RightsWarning identifier={movie.identifier} />
        )}

        {/* Movie Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {movie.title}
          </h1>
          {movie.year && (
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Year: {movie.year}
            </p>
          )}
        </div>

        {/* Top Ad */}
        <AdBanner slot="movie-top" format="horizontal" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Embed */}
            {hasPublicDomainLicense && (
              <div className="mb-6">
                <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`https://archive.org/embed/${movie.identifier}`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title={`Watch ${movie.title}`}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            {movie.description && (
              <section className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  About This Movie
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
              </section>
            )}

            {/* Download Links */}
            {files.length > 0 && hasPublicDomainLicense && (
              <section className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Download Options
                </h2>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index}>
                      <a
                        href={file.url}
                        className="text-blue-600 hover:underline flex items-center gap-2"
                        download
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {file.name} ({file.format})
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            {/* Movie Info */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Movie Information
              </h3>
              
              {movie.creator && (
                <div className="mb-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Director</p>
                  <p className="text-gray-900 dark:text-white">{movie.creator}</p>
                </div>
              )}

              {movie.year && (
                <div className="mb-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Release Year</p>
                  <p className="text-gray-900 dark:text-white">{movie.year}</p>
                </div>
              )}

              {movie.subject && (
                <div className="mb-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Genres</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(Array.isArray(movie.subject) ? movie.subject : [movie.subject]).map(genre => (
                      <Link
                        key={genre}
                        to={`/category/${genre.toLowerCase()}`}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {movie.licenseurl && (
                <div className="mb-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">License</p>
                  <a
                    href={movie.licenseurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Public Domain
                  </a>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <a
                  href={movie._archiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  View on Archive.org
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdBanner slot="sidebar" format="vertical" responsive={false} />
          </aside>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Related Movies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedMovies.map(movie => (
                <MovieCard key={movie.identifier} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom Ad */}
        <AdBanner slot="movie-bottom" format="horizontal" className="mt-8" />
      </div>
    </>
  );
}
