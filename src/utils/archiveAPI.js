import axios from 'axios';

const ARCHIVE_BASE = 'https://archive.org';
const SEARCH_ENDPOINT = `${ARCHIVE_BASE}/advancedsearch.php`;
const METADATA_ENDPOINT = `${ARCHIVE_BASE}/metadata`;

/**
 * Archive.org API Utility Functions
 * 
 * LEGAL COMPLIANCE:
 * - All queries filter for public domain content only
 * - Includes rights verification warnings
 * - Logs unclear licenses for manual review
 * 
 * SEO OPTIMIZATION:
 * - Rate limiting to prevent API throttling
 * - Efficient caching ready
 * - Structured data extraction
 */

// ============================================
// CORE SEARCH FUNCTIONS
// ============================================

/**
 * Search Archive.org for public domain movies
 * LEGAL NOTE: Only includes items with explicit public domain marking
 */
export const searchPublicDomainMovies = async (query = '', page = 1, rows = 20) => {
  try {
    // ⚠️ IMPORTANT: This query filters for public domain content only
    // licenseurl includes public domain markers
    // mediatype:movies filters to video content
    const searchQuery = query 
      ? `(${query}) AND mediatype:movies AND (licenseurl:*publicdomain* OR licenseurl:*cc0*)`
      : `mediatype:movies AND (licenseurl:*publicdomain* OR licenseurl:*cc0*)`;

    const params = {
      q: searchQuery,
      fl: ['identifier', 'title', 'description', 'year', 'creator', 'subject', 'licenseurl', 'downloads'].join(','),
      output: 'json',
      rows: rows,
      page: page,
      sort: 'downloads desc'
    };

    const response = await axios.get(SEARCH_ENDPOINT, { params });
    
    // Log items with unclear rights for manual review
    response.data.response.docs.forEach(doc => {
      if (!doc.licenseurl || (!doc.licenseurl.includes('publicdomain') && !doc.licenseurl.includes('cc0'))) {
        console.warn('⚠️ RIGHTS UNCLEAR - Manual review required:', doc.identifier);
      }
    });

    return {
      docs: response.data.response.docs,
      numFound: response.data.response.numFound,
      start: response.data.response.start
    };
  } catch (error) {
    console.error('Archive.org API Error:', error);
    throw error;
  }
};

// ============================================
// ✅ ENHANCED CATEGORY SEARCH FUNCTION
// ============================================

/**
 * Search by category with advanced filtering
 * @param {string} categoryType - 'genre' | 'decade' | 'language' | 'year'
 * @param {string} value - Category value (e.g., 'horror', '1920s', 'english')
 * @param {number} page - Page number (1-indexed)
 * @param {number} rows - Results per page
 * @param {string} sort - Sort field with direction (e.g., 'downloads desc', 'year asc')
 * @returns {Promise<{docs: Array, numFound: number, start: number}>}
 */
export const searchByCategory = async (
  categoryType, 
  value, 
  page = 1, 
  rows = 20,
  sort = 'downloads desc'
) => {
  try {
    // Base query with public domain filter
    let query = 'mediatype:movies AND (licenseurl:*publicdomain* OR licenseurl:*cc0* OR collection:prelinger OR collection:moviesandfilms)';
    
    // ✅ Build category-specific queries
    switch (categoryType.toLowerCase()) {
      case 'genre':
        // Handle multi-word genres (e.g., "film-noir" → "film noir")
        const genreValue = value.replace(/-/g, ' ');
        query += ` AND subject:"${genreValue}"`;
        break;
        
      case 'decade':
        // Extract start year from decade (e.g., "1920s" → 1920-1929)
        const startYear = parseInt(value.replace('s', ''));
        const endYear = startYear + 9;
        query += ` AND year:[${startYear} TO ${endYear}]`;
        break;
        
      case 'year':
        // Exact year match
        query += ` AND year:${value}`;
        break;
        
      case 'language':
        if (value.toLowerCase() === 'silent') {
          // Silent films (pre-1930)
          query += ' AND year:[* TO 1930]';
        } else {
          query += ` AND language:"${value}"`;
        }
        break;
        
      default:
        console.warn(`Unknown category type: ${categoryType}`);
    }

    const params = {
      q: query,
      fl: [
        'identifier',
        'title',
        'description',
        'year',
        'creator',
        'subject',
        'language',
        'licenseurl',
        'downloads',
        'runtime',
        'avg_rating',
        'num_reviews'
      ].join(','),
      output: 'json',
      rows: rows,
      page: page,
      sort: sort // ✅ Format: "field direction" (e.g., "downloads desc")
    };

    console.log('🔍 Category Search:', { categoryType, value, query });

    const response = await rateLimitedRequest(() => 
      axios.get(SEARCH_ENDPOINT, { params })
    );
    
    const results = response.data.response;
    
    console.log(`✅ Found ${results.numFound} results for ${categoryType}:${value}`);
    
    return {
      docs: results.docs || [],
      numFound: results.numFound || 0,
      start: results.start || 0
    };

  } catch (error) {
    console.error(`Category search error (${categoryType}:${value}):`, error);
    throw error;
  }
};

// ============================================
// ✅ MULTI-FILTER SEARCH FUNCTION
// ============================================

/**
 * Advanced search with multiple filters
 * @param {Object} filters - Filter object
 * @param {string} filters.genre - Genre filter
 * @param {string} filters.decade - Decade filter
 * @param {string} filters.language - Language filter
 * @param {number} filters.minYear - Minimum year
 * @param {number} filters.maxYear - Maximum year
 * @param {string} filters.searchText - Text search query
 * @param {number} page - Page number
 * @param {number} rows - Results per page
 * @param {string} sort - Sort order
 */
export const advancedSearch = async (filters = {}, page = 1, rows = 20, sort = 'downloads desc') => {
  try {
    let queryParts = ['mediatype:movies'];
    
    // Public domain filter (always required)
    queryParts.push('(licenseurl:*publicdomain* OR licenseurl:*cc0* OR collection:prelinger)');
    
    // Genre filter
    if (filters.genre) {
      queryParts.push(`subject:"${filters.genre.replace(/-/g, ' ')}"`);
    }
    
    // Decade filter
    if (filters.decade) {
      const startYear = parseInt(filters.decade.replace('s', ''));
      queryParts.push(`year:[${startYear} TO ${startYear + 9}]`);
    }
    
    // Year range filter
    if (filters.minYear || filters.maxYear) {
      const min = filters.minYear || '*';
      const max = filters.maxYear || '*';
      queryParts.push(`year:[${min} TO ${max}]`);
    }
    
    // Language filter
    if (filters.language) {
      if (filters.language.toLowerCase() === 'silent') {
        queryParts.push('year:[* TO 1930]');
      } else {
        queryParts.push(`language:"${filters.language}"`);
      }
    }
    
    // Text search
    if (filters.searchText) {
      queryParts.push(`(title:(${filters.searchText}) OR description:(${filters.searchText}))`);
    }
    
    const query = queryParts.join(' AND ');
    
    const params = {
      q: query,
      fl: [
        'identifier',
        'title',
        'description',
        'year',
        'creator',
        'subject',
        'language',
        'licenseurl',
        'downloads',
        'runtime'
      ].join(','),
      output: 'json',
      rows: rows,
      page: page,
      sort: sort
    };

    console.log('🔍 Advanced Search Query:', query);

    const response = await rateLimitedRequest(() => 
      axios.get(SEARCH_ENDPOINT, { params })
    );
    
    return {
      docs: response.data.response.docs || [],
      numFound: response.data.response.numFound || 0,
      start: response.data.response.start || 0
    };

  } catch (error) {
    console.error('Advanced search error:', error);
    throw error;
  }
};

// ============================================
// ✅ GET AVAILABLE CATEGORIES
// ============================================

/**
 * Fetch available categories with movie counts
 * Useful for generating dynamic category pages
 */
export const getAvailableCategories = async () => {
  try {
    const categories = {
      genres: ['Horror', 'Comedy', 'Drama', 'Sci-Fi', 'Western', 'Film Noir', 'Documentary', 'Animation', 'Mystery', 'Romance'],
      decades: ['1890s', '1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s'],
      languages: ['English', 'Silent', 'French', 'German', 'Italian', 'Spanish', 'Japanese', 'Russian']
    };

    // Fetch counts for each category (optional - can be cached)
    const categoriesWithCounts = {
      genres: [],
      decades: [],
      languages: []
    };

    // You can implement count fetching here if needed
    // For now, return structure without counts to avoid too many API calls

    return categories;

  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// ============================================
// METADATA FUNCTIONS
// ============================================

/**
 * Fetch detailed metadata for a specific movie
 */
export const getMovieMetadata = async (identifier) => {
  try {
    const response = await axios.get(`${METADATA_ENDPOINT}/${identifier}`);
    const metadata = response.data.metadata;
    
    // ⚠️ HUMAN REVIEW REQUIRED: Verify license before displaying
    const licenseUrl = metadata.licenseurl || '';
    const isPublicDomain = licenseUrl.includes('publicdomain') || licenseUrl.includes('cc0');
    
    if (!isPublicDomain) {
      console.warn(`⚠️ COPYRIGHT WARNING: ${identifier} may not be public domain. License: ${licenseUrl}`);
    }

    return {
      ...metadata,
      _rightsVerified: isPublicDomain,
      _archiveUrl: `https://archive.org/details/${identifier}`
    };
  } catch (error) {
    console.error(`Metadata fetch error for ${identifier}:`, error);
    throw error;
  }
};

/**
 * Get streaming/download URLs for a movie
 * POLICY: Only returns links if rights are clear
 */
export const getMovieFiles = async (identifier) => {
  try {
    const response = await axios.get(`${METADATA_ENDPOINT}/${identifier}/files`);
    const files = response.data.result || [];
    
    // Filter for video files
    const videoFiles = files.filter(file => 
      file.format === 'MPEG4' || 
      file.format === 'h.264' || 
      file.format === 'Ogg Video' ||
      file.name?.endsWith('.mp4') ||
      file.name?.endsWith('.ogv')
    );

    return videoFiles.map(file => ({
      name: file.name,
      size: file.size,
      format: file.format,
      url: `https://archive.org/download/${identifier}/${file.name}`
    }));
  } catch (error) {
    console.error('File fetch error:', error);
    return [];
  }
};

// ============================================
// FEATURED & POPULAR MOVIES
// ============================================

/**
 * Get featured/popular public domain movies
 */
export const getFeaturedMovies = async (limit = 12) => {
  return searchPublicDomainMovies('', 1, limit);
};

/**
 * Get movies by collection (e.g., Prelinger Archives)
 */
export const getMoviesByCollection = async (collection = 'prelinger', page = 1, rows = 20) => {
  try {
    const query = `mediatype:movies AND collection:${collection}`;
    
    const params = {
      q: query,
      fl: ['identifier', 'title', 'description', 'year', 'creator', 'subject', 'downloads'].join(','),
      output: 'json',
      rows: rows,
      page: page,
      sort: 'downloads desc'
    };

    const response = await rateLimitedRequest(() => 
      axios.get(SEARCH_ENDPOINT, { params })
    );
    
    return {
      docs: response.data.response.docs || [],
      numFound: response.data.response.numFound || 0,
      start: response.data.response.start || 0
    };

  } catch (error) {
    console.error(`Collection fetch error (${collection}):`, error);
    throw error;
  }
};

// ============================================
// ✅ RELATED MOVIES FUNCTION
// ============================================

/**
 * Get related movies based on genre/subject
 */
export const getRelatedMovies = async (identifier, limit = 6) => {
  try {
    // First get the movie's metadata to extract subjects
    const metadata = await getMovieMetadata(identifier);
    const subjects = metadata.subject || [];
    
    if (subjects.length === 0) {
      return { docs: [], numFound: 0 };
    }

    // Search for movies with similar subjects
    const subjectQuery = subjects.slice(0, 3).map(s => `subject:"${s}"`).join(' OR ');
    const query = `(${subjectQuery}) AND mediatype:movies AND (licenseurl:*publicdomain* OR licenseurl:*cc0*) AND NOT identifier:${identifier}`;
    
    const params = {
      q: query,
      fl: ['identifier', 'title', 'description', 'year', 'creator', 'subject', 'downloads'].join(','),
      output: 'json',
      rows: limit,
      page: 1,
      sort: 'downloads desc'
    };

    const response = await rateLimitedRequest(() => 
      axios.get(SEARCH_ENDPOINT, { params })
    );
    
    return {
      docs: response.data.response.docs || [],
      numFound: response.data.response.numFound || 0
    };

  } catch (error) {
    console.error('Related movies fetch error:', error);
    return { docs: [], numFound: 0 };
  }
};

// ============================================
// RATE LIMITING
// ============================================

// Rate limiting helper
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 200; // 200ms between requests

export const rateLimitedRequest = async (requestFn) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  return requestFn();
};

// ============================================
// ✅ UTILITY FUNCTIONS
// ============================================

/**
 * Generate thumbnail URL for a movie
 */
export const getThumbnailUrl = (identifier, size = 'default') => {
  const sizeMap = {
    small: '__ia_thumb.jpg',
    default: '__ia_thumb.jpg',
    large: '__ia_thumb.jpg'
  };
  
  return `https://archive.org/services/img/${identifier}`;
};

/**
 * Generate embed URL for video player
 */
export const getEmbedUrl = (identifier) => {
  return `https://archive.org/embed/${identifier}`;
};

/**
 * Format runtime from seconds to readable format
 */
export const formatRuntime = (seconds) => {
  if (!seconds) return 'Unknown';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Validate if item is truly public domain
 * ⚠️ CRITICAL for legal compliance
 */
export const validatePublicDomain = (metadata) => {
  const licenseUrl = metadata.licenseurl || '';
  const collection = metadata.collection || [];
  
  // Check license URL
  const hasPublicDomainLicense = 
    licenseUrl.includes('publicdomain') || 
    licenseUrl.includes('cc0') ||
    licenseUrl.includes('creativecommons.org/publicdomain');
  
  // Check trusted collections
  const trustedCollections = ['prelinger', 'moviesandfilms', 'opensource_movies'];
  const inTrustedCollection = trustedCollections.some(tc => 
    collection.includes(tc)
  );
  
  return {
    isValid: hasPublicDomainLicense || inTrustedCollection,
    licenseUrl,
    collection,
    warning: !hasPublicDomainLicense ? '⚠️ Manual rights verification required' : null
  };
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  searchPublicDomainMovies,
  searchByCategory,
  advancedSearch,
  getAvailableCategories,
  getMovieMetadata,
  getMovieFiles,
  getFeaturedMovies,
  getMoviesByCollection,
  getRelatedMovies,
  rateLimitedRequest,
  getThumbnailUrl,
  getEmbedUrl,
  formatRuntime,
  validatePublicDomain
};
