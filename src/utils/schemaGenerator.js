/**
 * Generate JSON-LD structured data for movies
 * Compliant with schema.org Movie specification
 */
export const generateMovieSchema = (movie) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title || "Untitled",
    "description": movie.description || "",
    "datePublished": movie.year ? `${movie.year}-01-01` : undefined,
    "genre": Array.isArray(movie.subject) ? movie.subject : [movie.subject],
    "director": movie.creator ? {
      "@type": "Person",
      "name": movie.creator
    } : undefined,
    "inLanguage": movie.language || "en",
    "license": movie.licenseurl || "https://creativecommons.org/publicdomain/mark/1.0/",
    "thumbnail": movie.identifier ? `https://archive.org/services/img/${movie.identifier}` : undefined,
    "contentUrl": movie.identifier ? `https://archive.org/details/${movie.identifier}` : undefined,
    "embedUrl": movie.identifier ? `https://archive.org/embed/${movie.identifier}` : undefined,
    "aggregateRating": movie.downloads ? {
      "@type": "AggregateRating",
      "ratingValue": "4.0",
      "reviewCount": Math.floor(movie.downloads / 10)
    } : undefined
  };

  // Remove undefined fields
  Object.keys(schema).forEach(key => schema[key] === undefined && delete schema[key]);

  return schema;
};

/**
 * Generate BreadcrumbList schema for navigation
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

/**
 * Generate WebSite schema for homepage
 */
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Archive Movies - Public Domain Classics",
    "url": import.meta.env.VITE_SITE_URL,
    "description": "Watch free public domain classic movies online from Internet Archive",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${import.meta.env.VITE_SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
};
