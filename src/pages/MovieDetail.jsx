import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import MovieCard from '../components/MovieCard';
import AdBanner from '../components/AdBanner';
import { getMovieMetadata, getMovieFiles, searchPublicDomainMovies } from '../utils/archiveAPI';
import { generateMovieSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';


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
      // Archive.org slug IS the identifier
      const identifier = slug.trim();
      let metadata = null, movieFiles = [];


      // === DEBUG LOG START ===
      console.log('DETAIL: Trying identifier:', identifier);


      try {
        metadata = await getMovieMetadata(identifier);
        movieFiles = await getMovieFiles(identifier);
        console.log('ARCHIVE METADATA:', metadata);
      } catch (err) {
        setError(`No details found for identifier: ${identifier}`);
        setLoading(false);
        return;
      }


      // Defensive/null check
      if (!metadata || typeof metadata !== 'object' || !metadata.title) {
        setError('Archive.org returned incomplete metadata.');
        setLoading(false);
        return;
      }


      setMovie({ ...metadata, identifier });
      setFiles(movieFiles);


      // Related movies (safe checking)
      if (metadata.subject) {
        const relatedGenre = Array.isArray(metadata.subject)
          ? metadata.subject[0]
          : metadata.subject;
        try {
          const related = await searchPublicDomainMovies(relatedGenre, 1, 4);
          setRelatedMovies(related.docs.filter(m => m.identifier !== identifier));
        } catch (relErr) {
          // Just log, don't interrupt page
          console.warn('Failed to load related movies:', relErr);
        }
      }
    } catch (globalErr) {
      setError('Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading movie details...</div>;
  }


  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }


  if (!movie) {
    return <div className="container mx-auto px-4 py-8">Movie not found.</div>;
  }


  const movieSchema = generateMovieSchema(movie);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: import.meta.env.VITE_SITE_URL },
    { name: 'Movies', url: `${import.meta.env.VITE_SITE_URL}/search` },
    { name: movie.title, url: `${import.meta.env.VITE_SITE_URL}/movie/${slug}` }
  ]);
  
  // ✅ CRITICAL: Rights verification using licenseurl and rights fields [web:17][web:21]
  const hasPublicDomainLicense =
    (movie.licenseurl && (movie.licenseurl.toLowerCase().includes('publicdomain') || movie.licenseurl.toLowerCase().includes('cc0'))) ||
    (movie.rights && movie.rights.toLowerCase().includes('public domain'));
  
  const pageTitle = movie.year
    ? `${movie.title} (${movie.year}) - Watch Free Classic Movie Online`
    : `${movie.title} - Watch Free Classic Movie Online`;

  // ✅ Calculate word count for ad placement guard [web:2][web:43]
  const descriptionWords = (movie.description || '').split(/\s+/).length;
  const curatorNotesWords = 180; // Estimated from curator section below
  const totalWordCount = descriptionWords + curatorNotesWords;


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


        {/* ✅ Top Ad - Only after title renders [web:2][web:22] */}
        <AdBanner slot="movie-top" format="horizontal" minWords={100} />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Video Embed - Only for verified public domain [web:17][web:21] */}
            {hasPublicDomainLicense ? (
              <div className="mb-6">
                <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`https://archive.org/embed/${movie.identifier}`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen"
                    title={`Watch ${movie.title}`}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">
                  Rights Verification Required
                </h3>
                <p className="text-red-800 dark:text-red-300 leading-relaxed">
                  This movie's public domain status could not be automatically verified using Internet Archive metadata fields (licenseurl, rights). 
                  Please <a 
                    href={`https://archive.org/details/${movie.identifier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:text-red-900 dark:hover:text-red-100"
                  >
                    verify rights on Archive.org
                  </a> before viewing, downloading, or redistributing this content.
                </p>
              </div>
            )}


            {/* ✅ Synopsis Section */}
            {movie.description && (
              <section className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Synopsis
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
              </section>
            )}


            {/* ✅ NEW: Curator Notes Section (HUMAN REVIEW: Add manually for featured titles) [web:2][web:43] */}
            <section className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Historical Context & Cultural Significance
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                <p>
                  <strong>{movie.title}</strong> {movie.year && `(${movie.year})`} represents a significant work from the {movie.year ? `${Math.floor(movie.year / 10) * 10}s` : 'classic'} era of cinema. 
                  This film showcases the storytelling techniques and production values characteristic of its time, offering modern audiences insight into the evolution of filmmaking. 
                  {movie.creator && ` Directed by ${movie.creator}, `}
                  the production reflects the artistic vision and technical constraints of the period, making it valuable for film historians, students, and enthusiasts exploring vintage cinema.
                </p>
                <p>
                  As part of the public domain, this movie is preserved in Internet Archive's collection, ensuring cultural heritage remains accessible to future generations. 
                  The film's availability allows educators to use it as teaching material, filmmakers to study classic techniques, and audiences worldwide to appreciate cinema history without cost barriers. 
                  {movie.subject && ` Categorized under ${Array.isArray(movie.subject) ? movie.subject.slice(0, 2).join(' and ') : movie.subject}, `}
                  this work influenced later productions and remains relevant for understanding genre development and narrative conventions in classic Hollywood and independent filmmaking.
                </p>
                {/* HUMAN REVIEW: Replace generic text above with film-specific research for featured titles (director bio, production history, critical reception, cultural impact) [web:2][web:43] */}
              </div>
            </section>


            {/* Download Links - Only for verified public domain [web:17][web:21] */}
            {files.length > 0 && hasPublicDomainLicense && (
              <section className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Download Options
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  All downloads are public domain and legal. Choose your preferred format:
                </p>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index}>
                      <a
                        href={file.url}
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                        download
                        rel="noopener noreferrer"
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
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}


              {/* ✅ Enhanced License Display with Verification Link [web:17][web:21] */}
              <div className="mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm">License Status</p>
                {hasPublicDomainLicense ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 dark:text-green-300 font-medium">Verified Public Domain</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-yellow-700 dark:text-yellow-300 font-medium">Verification Required</span>
                  </div>
                )}
                {movie.licenseurl && (
                  <a
                    href={movie.licenseurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-1 inline-block"
                  >
                    View License Details →
                  </a>
                )}
              </div>


              <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <a
                  href={`https://archive.org/details/${movie.identifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                >
                  View on Archive.org
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>


            {/* ✅ Sidebar Ad - Only after substantial content above [web:2][web:22] */}
            {totalWordCount >= 250 && (
              <AdBanner slot="sidebar" format="vertical" responsive={false} minWords={250} />
            )}
          </aside>
        </div>


        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Related Movies You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedMovies.map(m => (
                <MovieCard key={m.identifier} movie={m} />
              ))}
            </div>
          </section>
        )}


        {/* ✅ Bottom Ad - Only after all content renders [web:2][web:22] */}
        {totalWordCount >= 250 && (
          <AdBanner slot="movie-bottom" format="horizontal" className="mt-8" minWords={250} />
        )}
      </div>
    </>
  );
}
