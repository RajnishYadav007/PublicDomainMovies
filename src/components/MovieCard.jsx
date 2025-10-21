import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // ✅ Import blur effect
import RightsWarning from './RightsWarning';

/**
 * Movie Card Component - Optimized Version
 * 
 * Features:
 * ✅ Lazy loading images with blur effect
 * ✅ Intersection Observer for performance
 * ✅ Fallback images for errors
 * ✅ SEO-optimized semantic HTML
 * ✅ Accessibility improvements
 * ✅ Hover animations
 * ✅ Rights verification
 */
export default function MovieCard({ movie }) {
  // Generate slug for SEO-friendly URLs
  const slug = movie.identifier || 
    `${movie.title?.toLowerCase().replace(/\s+/g, '-')}-${movie.year || ''}`;
  
  const thumbnailUrl = `https://archive.org/services/img/${movie.identifier}`;
  const archiveUrl = `https://archive.org/details/${movie.identifier}`;
  
  // ✅ Placeholder image (low quality or base64)
  const placeholderUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3ELoading...%3C/text%3E%3C/svg%3E';
  
  // Check public domain license
  const hasPublicDomainLicense = movie.licenseurl && 
    (movie.licenseurl.includes('publicdomain') || movie.licenseurl.includes('cc0'));

  // ✅ Format year display
  const yearDisplay = movie.year ? 
    (Array.isArray(movie.year) ? movie.year[0] : movie.year) : 
    'Unknown';

  // ✅ Truncate description
  const truncatedDescription = movie.description 
    ? movie.description.length > 120 
      ? movie.description.substring(0, 120) + '...' 
      : movie.description
    : 'No description available';

  // ✅ Handle image error
  const handleImageError = (e) => {
    e.target.src = '/placeholder-movie.jpg'; // Fallback image
  };

  return (
    <article 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      itemScope 
      itemType="https://schema.org/Movie"
    >
      {/* ✅ Lazy Loaded Image with Blur Effect */}
      <Link 
        to={`/movie/${slug}`} 
        className="block relative overflow-hidden aspect-[3/4]"
        aria-label={`View details for ${movie.title}`}
      >
        <LazyLoadImage
          src={thumbnailUrl}
          placeholderSrc={placeholderUrl} // ✅ Low quality placeholder
          alt={`${movie.title || 'Movie'} poster`}
          effect="blur" // ✅ Blur effect during loading
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
          loading="lazy"
          width="300"
          height="400"
          wrapperClassName="w-full h-full"
          threshold={100} // Start loading 100px before visible
        />
        
        {/* ✅ Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-semibold text-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            View Details
          </span>
        </div>

        {/* ✅ Year Badge */}
        {yearDisplay !== 'Unknown' && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {yearDisplay}
          </div>
        )}
      </Link>
      
      {/* ✅ Card Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link to={`/movie/${slug}`} className="block">
          <h3 
            className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 min-h-[3.5rem]"
            itemProp="name"
          >
            {movie.title || 'Untitled'}
          </h3>
        </Link>
        
        {/* Metadata Row */}
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          {/* Year */}
          {yearDisplay !== 'Unknown' && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <time itemProp="datePublished">{yearDisplay}</time>
            </span>
          )}
          
          {/* Downloads */}
          {movie.downloads && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              {Number(movie.downloads).toLocaleString()}
            </span>
          )}
        </div>

        {/* Description */}
        <p 
          className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed"
          itemProp="description"
        >
          {truncatedDescription}
        </p>

        {/* ✅ Genre Tags */}
        {movie.subject && Array.isArray(movie.subject) && (
          <div className="flex flex-wrap gap-2">
            {movie.subject.slice(0, 3).map((genre, index) => (
              <span 
                key={index}
                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        
        {/* ✅ Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          {/* Archive Link */}
          <a
            href={archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-colors"
            aria-label={`View ${movie.title} on Archive.org`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
            Archive.org
          </a>
          
          {/* ✅ Rights Warning Badge */}
          {!hasPublicDomainLicense && (
            <RightsWarning compact />
          )}
        </div>
      </div>
    </article>
  );
}
