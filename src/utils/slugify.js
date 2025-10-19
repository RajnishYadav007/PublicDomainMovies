/**
 * Generate SEO-friendly URL slugs
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

/**
 * Generate movie slug with year
 */
export const generateMovieSlug = (title, year) => {
  const titleSlug = slugify(title);
  return year ? `${titleSlug}-${year}` : titleSlug;
};

/**
 * Parse movie slug to extract title and year
 */
export const parseMovieSlug = (slug) => {
  const parts = slug.split('-');
  const year = parts[parts.length - 1];
  
  if (/^\d{4}$/.test(year)) {
    return {
      titleSlug: parts.slice(0, -1).join('-'),
      year: parseInt(year)
    };
  }
  
  return {
    titleSlug: slug,
    year: null
  };
};
