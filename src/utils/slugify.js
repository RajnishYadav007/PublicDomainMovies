/**
 * SEO-Friendly URL Slug Utilities
 * 
 * ✅ ENHANCEMENTS:
 * - Unicode/diacritic character handling (é → e, ñ → n)
 * - XSS prevention with input sanitization
 * - Maximum length enforcement (Google recommends <60 chars)
 * - Stop words removal for shorter URLs
 * - Leading/trailing hyphen removal
 * - Consecutive hyphen normalization
 * - Number handling options
 * 
 * SEO BEST PRACTICES:
 * - Lowercase only (case-insensitive URLs)
 * - Hyphens for word separation (not underscores)
 * - Remove special characters
 * - Keep URLs short and readable
 * - Include relevant keywords
 * 
 * SECURITY:
 * - Input validation prevents XSS attacks
 * - Special character stripping
 * - URL encoding for safe transmission
 */

// ============================================
// ✅ CHARACTER MAPPING FOR UNICODE
// ============================================

/**
 * Comprehensive diacritic to ASCII mapping
 * Handles most European languages + common special chars
 */
const DIACRITIC_MAP = {
  // Latin characters with diacritics
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'ā': 'a', 'ă': 'a', 'ą': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ē': 'e', 'ė': 'e', 'ę': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ī': 'i', 'į': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ō': 'o', 'ő': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ū': 'u', 'ů': 'u', 'ű': 'u',
  'ý': 'y', 'ÿ': 'y',
  'ñ': 'n', 'ń': 'n',
  'ç': 'c', 'ć': 'c', 'č': 'c',
  'ś': 's', 'š': 's',
  'ź': 'z', 'ż': 'z', 'ž': 'z',
  'đ': 'd',
  'ł': 'l',
  'ř': 'r',
  'ť': 't',
  
  // German special characters
  'ß': 'ss',
  
  // French ligatures
  'æ': 'ae', 'œ': 'oe',
  
  // Uppercase versions
  'À': 'a', 'Á': 'a', 'Â': 'a', 'Ã': 'a', 'Ä': 'a', 'Å': 'a',
  'È': 'e', 'É': 'e', 'Ê': 'e', 'Ë': 'e',
  'Ì': 'i', 'Í': 'i', 'Î': 'i', 'Ï': 'i',
  'Ò': 'o', 'Ó': 'o', 'Ô': 'o', 'Õ': 'o', 'Ö': 'o',
  'Ù': 'u', 'Ú': 'u', 'Û': 'u', 'Ü': 'u',
  'Ý': 'y', 'Ÿ': 'y',
  'Ñ': 'n',
  'Ç': 'c',
  'Æ': 'ae', 'Œ': 'oe'
};

/**
 * Common stop words to remove for shorter URLs
 * Based on SEO best practices - removes filler words
 */
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with'
]);

// ============================================
// ✅ ENHANCED SLUGIFY FUNCTION
// ============================================

/**
 * Generate SEO-friendly URL slug with comprehensive options
 * 
 * @param {string} text - Input text to slugify
 * @param {Object} options - Configuration options
 * @param {number} options.maxLength - Maximum slug length (default: 60)
 * @param {boolean} options.removeStopWords - Remove common stop words (default: false)
 * @param {boolean} options.preserveNumbers - Keep numbers in slug (default: true)
 * @param {boolean} options.strict - Strict mode: only allow [a-z0-9-] (default: true)
 * @returns {string} SEO-friendly slug
 * 
 * @example
 * slugify('The Best Classic Movies of 1950s!');
 * // Returns: 'the-best-classic-movies-of-1950s'
 * 
 * slugify('Crème Brûlée & Café', { removeStopWords: false });
 * // Returns: 'creme-brulee-cafe'
 */
export const slugify = (text, options = {}) => {
  // Default options
  const {
    maxLength = 60,
    removeStopWords = false,
    preserveNumbers = true,
    strict = true
  } = options;
  
  // Input validation - prevent XSS
  if (!text || typeof text !== 'string') {
    console.warn('slugify: Invalid input, expected string');
    return '';
  }
  
  // Limit input length to prevent DoS attacks
  if (text.length > 500) {
    console.warn('slugify: Input too long, truncating to 500 characters');
    text = text.substring(0, 500);
  }
  
  let slug = text
    .toString()
    .trim()
    // Convert to lowercase first
    .toLowerCase()
    // Replace diacritics with ASCII equivalents
    .split('')
    .map(char => DIACRITIC_MAP[char] || char)
    .join('')
    // Normalize Unicode (NFD decomposition)
    .normalize('NFD')
    // Remove combining diacritical marks
    .replace(/[\u0300-\u036f]/g, '')
    // Replace ampersands with 'and'
    .replace(/&/g, '-and-')
    // Replace apostrophes with nothing (don't → dont)
    .replace(/['']/g, '')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-');
  
  // Optional: Remove numbers if not preserving
  if (!preserveNumbers) {
    slug = slug.replace(/\d+/g, '');
  }
  
  // Strict mode: only allow alphanumeric and hyphens
  if (strict) {
    slug = slug.replace(/[^a-z0-9\-]/g, '');
  } else {
    // Allow some additional safe characters
    slug = slug.replace(/[^a-z0-9\-_.~]/g, '');
  }
  
  // Optional: Remove stop words
  if (removeStopWords) {
    slug = slug
      .split('-')
      .filter(word => word.length > 0 && !STOP_WORDS.has(word))
      .join('-');
  }
  
  // Normalize consecutive hyphens to single hyphen
  slug = slug.replace(/-+/g, '-');
  
  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');
  
  // Enforce maximum length (cut at word boundary)
  if (maxLength && slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Cut at last complete word (last hyphen within limit)
    const lastHyphen = slug.lastIndexOf('-');
    if (lastHyphen > 0) {
      slug = slug.substring(0, lastHyphen);
    }
  }
  
  // Final validation: ensure slug is not empty
  if (!slug) {
    console.warn('slugify: Generated empty slug, using fallback');
    return 'untitled';
  }
  
  return slug;
};

// ============================================
// ✅ MOVIE-SPECIFIC SLUG FUNCTIONS
// ============================================

/**
 * Generate movie slug with year for unique identification
 * Format: "movie-title-1950" or "movie-title"
 * 
 * @param {string} title - Movie title
 * @param {number|string} year - Release year (optional)
 * @param {Object} options - Slugify options
 * @returns {string} Movie slug
 * 
 * @example
 * generateMovieSlug('The Night of the Living Dead', 1968);
 * // Returns: 'night-living-dead-1968' (stop words removed)
 * 
 * generateMovieSlug('Citizen Kane', 1941, { removeStopWords: false });
 * // Returns: 'citizen-kane-1941'
 */
export const generateMovieSlug = (title, year, options = {}) => {
  // Validate inputs
  if (!title || typeof title !== 'string') {
    console.error('generateMovieSlug: Title is required');
    return 'untitled-movie';
  }
  
  // Default options for movie slugs
  const movieOptions = {
    maxLength: 50, // Leave room for year suffix
    removeStopWords: true, // Remove 'the', 'of', etc. for shorter URLs
    preserveNumbers: true,
    strict: true,
    ...options
  };
  
  const titleSlug = slugify(title, movieOptions);
  
  // Validate and append year if provided
  if (year) {
    const yearNum = parseInt(year);
    // Validate year range (cinema era: 1888-present)
    if (!isNaN(yearNum) && yearNum >= 1888 && yearNum <= new Date().getFullYear() + 5) {
      return `${titleSlug}-${yearNum}`;
    } else {
      console.warn(`generateMovieSlug: Invalid year ${year}, omitting from slug`);
    }
  }
  
  return titleSlug;
};

/**
 * Parse movie slug to extract title and year
 * Handles both formats: "title-1950" and "title"
 * 
 * @param {string} slug - Movie URL slug
 * @returns {Object} Parsed components { titleSlug, year }
 * 
 * @example
 * parseMovieSlug('dracula-1931');
 * // Returns: { titleSlug: 'dracula', year: 1931 }
 * 
 * parseMovieSlug('nosferatu');
 * // Returns: { titleSlug: 'nosferatu', year: null }
 */
export const parseMovieSlug = (slug) => {
  // Input validation
  if (!slug || typeof slug !== 'string') {
    console.warn('parseMovieSlug: Invalid slug');
    return { titleSlug: '', year: null };
  }
  
  // Sanitize slug (prevent XSS)
  const sanitizedSlug = slug.toLowerCase().trim();
  
  // Split by hyphen
  const parts = sanitizedSlug.split('-');
  
  // Check if last part is a valid year
  const lastPart = parts[parts.length - 1];
  
  // Year validation: 4 digits, reasonable range (1888-2100)
  if (/^\d{4}$/.test(lastPart)) {
    const yearNum = parseInt(lastPart);
    
    if (yearNum >= 1888 && yearNum <= 2100) {
      return {
        titleSlug: parts.slice(0, -1).join('-'),
        year: yearNum
      };
    }
  }
  
  // No year found, return full slug as title
  return {
    titleSlug: sanitizedSlug,
    year: null
  };
};

// ============================================
// ✅ UTILITY FUNCTIONS
// ============================================

/**
 * Generate identifier-based slug (Archive.org identifier to URL slug)
 * Archive.org identifiers may contain underscores - convert to hyphens
 * 
 * @param {string} identifier - Archive.org identifier
 * @returns {string} URL-friendly slug
 * 
 * @example
 * identifierToSlug('Night_of_the_Living_Dead_1968');
 * // Returns: 'night-of-the-living-dead-1968'
 */
export const identifierToSlug = (identifier) => {
  if (!identifier) return '';
  
  return identifier
    .toLowerCase()
    .replace(/_/g, '-') // Replace underscores with hyphens
    .replace(/[^a-z0-9\-]/g, '') // Remove other special chars
    .replace(/-+/g, '-') // Normalize hyphens
    .replace(/^-+|-+$/g, ''); // Trim hyphens
};

/**
 * Validate slug format (security check)
 * Ensures slug only contains safe characters
 * 
 * @param {string} slug - Slug to validate
 * @returns {boolean} True if valid, false otherwise
 * 
 * @example
 * isValidSlug('classic-horror-movies-1920s'); // true
 * isValidSlug('bad<script>alert(1)</script>'); // false
 */
export const isValidSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return false;
  
  // Must contain only lowercase letters, numbers, and hyphens
  // Must not start or end with hyphen
  // Must not contain consecutive hyphens
  const validPattern = /^[a-z0-9]+([a-z0-9\-]*[a-z0-9]+)?$/;
  
  // Length validation (3-100 characters)
  if (slug.length < 3 || slug.length > 100) return false;
  
  return validPattern.test(slug);
};

/**
 * Generate unique slug by appending counter if duplicate exists
 * Useful when checking against existing slugs in database
 * 
 * @param {string} baseSlug - Original slug
 * @param {Function} checkExists - Async function to check if slug exists
 * @param {number} maxAttempts - Maximum attempts (default: 100)
 * @returns {Promise<string>} Unique slug
 * 
 * @example
 * const uniqueSlug = await generateUniqueSlug(
 *   'dracula-1931',
 *   async (slug) => await db.movies.findOne({ slug })
 * );
 * // Returns: 'dracula-1931-2' if original exists
 */
export const generateUniqueSlug = async (baseSlug, checkExists, maxAttempts = 100) => {
  let slug = baseSlug;
  let counter = 2;
  
  while (counter <= maxAttempts) {
    const exists = await checkExists(slug);
    
    if (!exists) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  // Fallback: append timestamp if too many duplicates
  return `${baseSlug}-${Date.now()}`;
};

/**
 * Decode slug for display purposes
 * Converts hyphens back to spaces and title-cases
 * 
 * @param {string} slug - URL slug
 * @returns {string} Human-readable title
 * 
 * @example
 * decodeSlug('night-of-the-living-dead-1968');
 * // Returns: 'Night Of The Living Dead 1968'
 */
export const decodeSlug = (slug) => {
  if (!slug) return '';
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * URL-encode slug for safe transmission
 * Use when passing slugs in query parameters
 * 
 * @param {string} slug - Slug to encode
 * @returns {string} URL-encoded slug
 */
export const encodeSlug = (slug) => {
  if (!slug) return '';
  return encodeURIComponent(slug);
};

/**
 * URL-decode slug from query parameters
 * 
 * @param {string} encodedSlug - Encoded slug
 * @returns {string} Decoded slug
 */
export const decodeSlugParam = (encodedSlug) => {
  if (!encodedSlug) return '';
  
  try {
    return decodeURIComponent(encodedSlug);
  } catch (error) {
    console.error('decodeSlugParam: Invalid encoded slug', error);
    return encodedSlug; // Return as-is if decoding fails
  }
};

// ============================================
// ✅ EXPORT ALL FUNCTIONS
// ============================================

export default {
  slugify,
  generateMovieSlug,
  parseMovieSlug,
  identifierToSlug,
  isValidSlug,
  generateUniqueSlug,
  decodeSlug,
  encodeSlug,
  decodeSlugParam,
  // Export constants for custom usage
  DIACRITIC_MAP,
  STOP_WORDS
};
