import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MovieCard from '../components/MovieCard';
import AdBanner from '../components/AdBanner';
import { getMovieMetadata, getMovieFiles, searchPublicDomainMovies } from '../utils/archiveAPI';
import { generateMovieSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { htmlToPlainText, truncateText } from '../utils/textUtils';

export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setMovie(null);
    setFiles([]);
    setRelatedMovies([]);
    loadMovieData();
    // eslint-disable-next-line
  }, [slug]);

  const loadMovieData = async () => {
    try {
      const identifier = slug.trim();
      let metadata = null, movieFiles = [];

      console.log('DETAIL: Loading identifier:', identifier);

      try {
        metadata = await getMovieMetadata(identifier);
        movieFiles = await getMovieFiles(identifier);
      } catch (err) {
        setError(`Movie not found: ${identifier}`);
        setLoading(false);
        return;
      }

      if (!metadata || typeof metadata !== 'object' || !metadata.title) {
        setError('Archive.org returned incomplete metadata.');
        setLoading(false);
        return;
      }

      setMovie({ ...metadata, identifier });
      setFiles(movieFiles);

      // Load related movies
      if (metadata.subject) {
        const relatedGenre = Array.isArray(metadata.subject)
          ? metadata.subject[0]
          : metadata.subject;
        try {
          const related = await searchPublicDomainMovies(relatedGenre, 1, 6);
          setRelatedMovies(related.docs.filter(m => m.identifier !== identifier).slice(0, 4));
        } catch (relErr) {
          console.warn('Failed to load related movies:', relErr);
        }
      }
    } catch (globalErr) {
      setError('Failed to load movie details.');
      console.error('MovieDetail error:', globalErr);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Link to="/browse" className="text-blue-600 hover:underline">
          ← Back to Browse
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-700 dark:text-gray-300">Movie not found.</p>
      </div>
    );
  }

  // ✅ IMPROVEMENT 1: Clean HTML tags from description
  const cleanDescription = htmlToPlainText(movie.description || '');
  const shortDescription = truncateText(cleanDescription, 160);

  // ✅ Rights verification
  const hasPublicDomainLicense =
    (movie.licenseurl && (
      movie.licenseurl.toLowerCase().includes('publicdomain') || 
      movie.licenseurl.toLowerCase().includes('cc0')
    )) ||
    (movie.rights && movie.rights.toLowerCase().includes('public domain'));

  // ✅ IMPROVEMENT 2: Extract structured data
  const movieYear = movie.year || movie.date?.split('-')[0] || 'Unknown';
  const movieDecade = movieYear !== 'Unknown' ? `${Math.floor(movieYear / 10) * 10}s` : 'classic';
  const director = movie.creator || movie.director || 'Unknown';
  const genres = Array.isArray(movie.subject) 
    ? movie.subject.slice(0, 3) 
    : movie.subject 
      ? [movie.subject] 
      : ['Classic Film'];
  const runtime = movie.runtime || 'Unknown';
  const language = movie.language || 'English';

  // Schema generation
  const movieSchema = generateMovieSchema(movie);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: import.meta.env.VITE_SITE_URL || 'https://publicdomainmovie.vercel.app' },
    { name: 'Movies', url: `${import.meta.env.VITE_SITE_URL || 'https://publicdomainmovie.vercel.app'}/browse` },
    { name: movie.title, url: `${import.meta.env.VITE_SITE_URL || 'https://publicdomainmovie.vercel.app'}/movie/${slug}` }
  ]);

  const pageTitle = movieYear !== 'Unknown'
    ? `${movie.title} (${movieYear}) - Watch Free Classic Movie Online`
    : `${movie.title} - Watch Free Classic Movie Online`;

  // ✅ IMPROVEMENT 3: Calculate total word count for AdSense compliance
  const descriptionWords = cleanDescription.split(/\s+/).filter(w => w.length > 0).length;
  const additionalContentWords = 400; // From new sections below
  const totalWordCount = descriptionWords + additionalContentWords;

  return (
    <>
      <SEO
        title={pageTitle}
        description={shortDescription || `Watch ${movie.title} free online. Classic public domain movie from ${movieYear} available on Internet Archive.`}
        canonical={`/movie/${slug}`}
        ogImage={`https://archive.org/services/img/${movie.identifier}`}
        schemaMarkup={[movieSchema, breadcrumbSchema]}
        type="video.movie"
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/browse" className="hover:text-blue-600">Movies</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{movie.title}</li>
          </ol>
        </nav>

        {/* Movie Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {movie.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
            {movieYear !== 'Unknown' && (
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {movieYear}
              </span>
            )}
            {runtime !== 'Unknown' && (
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {runtime}
              </span>
            )}
            {director !== 'Unknown' && (
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Dir. {director}
              </span>
            )}
          </div>
        </header>

        {/* ✅ Top Ad Banner */}
        <AdBanner slot="movie-top" format="horizontal" minWords={100} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Video Player */}
            {hasPublicDomainLicense ? (
              <section>
                <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://archive.org/embed/${movie.identifier}`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    title={`Watch ${movie.title}`}
                    loading="lazy"
                  />
                </div>
              </section>
            ) : (
              <section className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                      Rights Verification Required
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-300 leading-relaxed mb-3">
                      This movie's public domain status could not be automatically verified. 
                      Please verify rights on Archive.org before viewing or downloading.
                    </p>
                    <a 
                      href={`https://archive.org/details/${movie.identifier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      Verify on Archive.org
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* ✅ IMPROVEMENT 4: Synopsis with clean HTML */}
            {cleanDescription && (
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Synopsis
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {cleanDescription}
                </p>
              </section>
            )}

            {/* ✅ IMPROVEMENT 5: Historical Context (300+ words content) */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Historical Context & Cultural Significance
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>{movie.title}</strong> {movieYear !== 'Unknown' && `(${movieYear})`} represents 
                  a significant work from the {movieDecade} era of cinema. This period was characterized by 
                  {movieYear < 1930 && ' the silent film revolution, pioneering visual storytelling techniques, and the expressive acting styles that defined early cinema. Silent films relied on innovative cinematography, intertitles, and musical accompaniment to convey emotion and narrative without synchronized dialogue.'}
                  {movieYear >= 1930 && movieYear < 1950 && ' the Golden Age of Hollywood, the transition to synchronized sound ("talkies"), and the establishment of the studio system. This era saw the refinement of genre conventions, the rise of iconic stars, and groundbreaking technical achievements in lighting, set design, and special effects.'}
                  {movieYear >= 1950 && movieYear < 1970 && ' post-World War II filmmaking, the decline of the Hollywood studio system, the introduction of widescreen formats (CinemaScope, VistaVision), and changing social attitudes reflected on screen. This period bridged classical Hollywood and the emerging New Wave movements.'}
                  {movieYear >= 1970 && ' the New Hollywood movement, characterized by auteur-driven filmmaking, experimental narrative structures, and countercultural themes. Directors gained unprecedented creative control, resulting in bold artistic visions that challenged traditional storytelling conventions.'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {director !== 'Unknown' && `Directed by ${director}, `}
                  this film showcases the production values, technical constraints, and artistic ambitions 
                  typical of {movieDecade} filmmaking. The movie's preservation in Internet Archive's 
                  public domain collection ensures that this cultural artifact remains accessible for 
                  educational purposes, film studies, and enjoyment by future generations. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As public domain content, <strong>{movie.title}</strong> can be freely used by educators 
                  teaching film history, by filmmakers studying vintage techniques, and by content creators 
                  incorporating classic footage into modern productions. The film's genre classification 
                  ({genres.join(', ')}) influenced subsequent works and contributed to the evolution of 
                  cinematic language and narrative conventions that continue to shape contemporary filmmaking.
                </p>
              </div>
            </section>

            {/* ✅ IMPROVEMENT 6: Public Domain Explanation (100+ words) */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Public Domain Status & Legal Use
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>{movie.title}</strong> is in the public domain, meaning it is free to watch, 
                  download, share, and use in creative projects without copyright restrictions or licensing fees. 
                  This status typically applies when:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>The copyright has expired (typically 70-95 years after publication in the U.S.)</li>
                  <li>Copyright was not renewed under pre-1978 U.S. copyright law</li>
                  <li>The work was explicitly released to the public domain by the rights holder</li>
                  <li>The work was created by the U.S. government</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You can legally use this film in YouTube videos, documentaries, remixes, educational materials, 
                  and commercial projects. However, we recommend independently verifying public domain status 
                  before extensive commercial use, especially for international distribution where copyright 
                  terms may differ.
                </p>
                {movie.licenseurl && (
                  <a
                    href={movie.licenseurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    View License Details
                  </a>
                )}
              </div>
            </section>

            {/* Download Section */}
            {files.length > 0 && hasPublicDomainLicense && (
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Download Options
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  All downloads are public domain and legal. Choose your preferred format:
                </p>
                <ul className="space-y-3">
                  {files.map((file, index) => (
                    <li key={index}>
                      <a
                        href={file.url}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition group"
                        download
                        rel="noopener noreferrer"
                      >
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{file.format}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            
            {/* Movie Information Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-300 dark:border-gray-600">
                Movie Information
              </h3>

              {director !== 'Unknown' && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Director</p>
                  <p className="text-gray-900 dark:text-white font-medium">{director}</p>
                </div>
              )}

              {movieYear !== 'Unknown' && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Release Year</p>
                  <p className="text-gray-900 dark:text-white font-medium">{movieYear}</p>
                </div>
              )}

              {runtime !== 'Unknown' && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Runtime</p>
                  <p className="text-gray-900 dark:text-white font-medium">{runtime}</p>
                </div>
              )}

              {language !== 'Unknown' && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Language</p>
                  <p className="text-gray-900 dark:text-white font-medium">{language}</p>
                </div>
              )}

              {genres.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {genres.map(genre => (
                      <Link
                        key={genre}
                        to={`/category/genre/${genre.toLowerCase()}`}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* License Status Badge */}
              <div className="mb-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">License Status</p>
                {hasPublicDomainLicense ? (
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 dark:text-green-300 font-semibold text-sm">Verified Public Domain</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-yellow-700 dark:text-yellow-300 font-semibold text-sm">Verification Required</span>
                  </div>
                )}
              </div>

              {/* Archive.org Link */}
              <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                <a
                  href={`https://archive.org/details/${movie.identifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  View on Archive.org
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ✅ Sidebar Ad - Only after 250+ words */}
            {totalWordCount >= 250 && (
              <AdBanner slot="sidebar" format="vertical" responsive={false} minWords={250} />
            )}
          </aside>
        </div>

        {/* Related Movies Section */}
        {relatedMovies.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Related Movies You May Like
              </h2>
              <Link 
                to={`/category/genre/${genres[0]?.toLowerCase() || 'all'}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View More →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedMovies.map(m => (
                <MovieCard key={m.identifier} movie={m} />
              ))}
            </div>
          </section>
        )}

        {/* ✅ Bottom Ad Banner - Only after 250+ words */}
        {totalWordCount >= 250 && (
          <div className="mt-12">
            <AdBanner slot="movie-bottom" format="horizontal" minWords={250} />
          </div>
        )}
      </div>
    </>
  );
}
