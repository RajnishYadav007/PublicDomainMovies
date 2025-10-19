import { Link } from 'react-router-dom';
import { generateMovieSlug } from '../utils/slugify';
import RightsWarning from './RightsWarning';

/**
 * Movie card component with thumbnail, metadata, and rights info
 * SEO-optimized with semantic HTML and lazy-loaded images
 */
export default function MovieCard({ movie }) {
  const slug = generateMovieSlug(movie.title, movie.year);
  const thumbnailUrl = `https://archive.org/services/img/${movie.identifier}`;
  const archiveUrl = `https://archive.org/details/${movie.identifier}`;
  
  // Check if rights are clear
  const hasPublicDomainLicense = movie.licenseurl && 
    (movie.licenseurl.includes('publicdomain') || movie.licenseurl.includes('cc0'));

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link to={`/movie/${slug}`} className="block">
        <img
          src={thumbnailUrl}
          alt={`${movie.title} movie poster`}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/movie/${slug}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 mb-2">
            {movie.title}
          </h3>
        </Link>
        
        {movie.year && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Year: {movie.year}
          </p>
        )}
        
        {movie.description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3">
            {movie.description.substring(0, 150)}...
          </p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <a
            href={archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
            aria-label={`View ${movie.title} on Archive.org`}
          >
            Source: Archive.org
          </a>
          
          {!hasPublicDomainLicense && (
            <RightsWarning compact />
          )}
        </div>
      </div>
    </article>
  );
}
