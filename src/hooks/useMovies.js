import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  searchByCategory, 
  getFeaturedMovies, 
  getMovieMetadata,
  getRelatedMovies,
  getMovieFiles 
} from '../utils/archiveAPI';

/**
 * Custom TanStack Query Hooks for Archive.org API
 * ✅ Updated for TanStack Query v5 syntax
 * ✅ Automatic caching, background refetching, error handling
 * ✅ Optimized staleTime and gcTime (formerly cacheTime)
 * 
 * @module hooks/useCategoryMovies
 */

// ============================================
// CATEGORY MOVIES HOOK
// ============================================

/**
 * Hook for fetching movies by category with pagination and sorting
 * 
 * @param {string} categoryType - 'genre' | 'decade' | 'language' | 'year'
 * @param {string} categoryValue - Category value (e.g., 'horror', '1920s')
 * @param {number} page - Page number (default: 1)
 * @param {string} sort - Sort order (default: 'downloads desc')
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result { data, isLoading, error, refetch, ... }
 * 
 * @example
 * const { data, isLoading, error } = useCategoryMovies('genre', 'horror', 1);
 */
export function useCategoryMovies(
  categoryType, 
  categoryValue, 
  page = 1, 
  sort = 'downloads desc',
  options = {}
) {
  return useQuery({
    // ✅ Unique query key for caching (all dependencies included)
    queryKey: ['movies', categoryType, categoryValue, page, sort],
    
    // ✅ Fetch function
    queryFn: async () => {
      try {
        const result = await searchByCategory(categoryType, categoryValue, page, 20, sort);
        return result;
      } catch (error) {
        console.error(`Failed to fetch ${categoryType}:${categoryValue}:`, error);
        throw error;
      }
    },
    
    // ✅ Data is considered fresh for 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    
    // ✅ Keep unused data in cache for 10 minutes (v5: gcTime instead of cacheTime)
    gcTime: 10 * 60 * 1000, // 10 minutes
    
    // ✅ Enable query only if required params exist
    enabled: Boolean(categoryType && categoryValue),
    
    // ✅ Don't refetch on window focus (user might be reading)
    refetchOnWindowFocus: false,
    
    // ✅ Retry failed requests 2 times with exponential backoff
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // ✅ Show placeholder data while loading new page
    placeholderData: (previousData) => previousData,
    
    // ✅ Merge with custom options
    ...options
  });
}

// ============================================
// FEATURED MOVIES HOOK
// ============================================

/**
 * Hook for fetching featured/popular movies
 * 
 * @param {number} limit - Number of movies to fetch (default: 12)
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result
 * 
 * @example
 * const { data, isLoading } = useFeaturedMovies(12);
 */
export function useFeaturedMovies(limit = 12, options = {}) {
  return useQuery({
    queryKey: ['featured-movies', limit],
    
    queryFn: async () => {
      try {
        const result = await getFeaturedMovies(limit);
        return result;
      } catch (error) {
        console.error('Failed to fetch featured movies:', error);
        throw error;
      }
    },
    
    // ✅ Featured movies change rarely, cache longer
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000,    // 30 minutes
    
    refetchOnWindowFocus: false,
    retry: 2,
    
    ...options
  });
}

// ============================================
// MOVIE DETAILS HOOK
// ============================================

/**
 * Hook for fetching single movie metadata
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result
 * 
 * @example
 * const { data: movie, isLoading } = useMovieDetails('dracula_1931');
 */
export function useMovieDetails(identifier, options = {}) {
  return useQuery({
    queryKey: ['movie', identifier],
    
    queryFn: async () => {
      if (!identifier) {
        throw new Error('Movie identifier is required');
      }
      
      try {
        const metadata = await getMovieMetadata(identifier);
        return metadata;
      } catch (error) {
        console.error(`Failed to fetch movie ${identifier}:`, error);
        throw error;
      }
    },
    
    // ✅ Movie metadata rarely changes, cache longer
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000,    // 1 hour
    
    enabled: Boolean(identifier),
    refetchOnWindowFocus: false,
    retry: 2,
    
    ...options
  });
}

// ============================================
// MOVIE FILES HOOK (Download Links)
// ============================================

/**
 * Hook for fetching movie download files
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result with array of files
 * 
 * @example
 * const { data: files, isLoading } = useMovieFiles('dracula_1931');
 */
export function useMovieFiles(identifier, options = {}) {
  return useQuery({
    queryKey: ['movie-files', identifier],
    
    queryFn: async () => {
      if (!identifier) {
        throw new Error('Movie identifier is required');
      }
      
      try {
        const files = await getMovieFiles(identifier);
        return files;
      } catch (error) {
        console.error(`Failed to fetch files for ${identifier}:`, error);
        // Return empty array instead of throwing (non-critical error)
        return [];
      }
    },
    
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    
    enabled: Boolean(identifier),
    refetchOnWindowFocus: false,
    retry: 1, // Files endpoint less critical, retry only once
    
    ...options
  });
}

// ============================================
// RELATED MOVIES HOOK
// ============================================

/**
 * Hook for fetching related movies based on current movie
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {number} limit - Number of related movies (default: 6)
 * @param {Object} options - Additional TanStack Query options
 * @returns {Object} Query result
 * 
 * @example
 * const { data: related, isLoading } = useRelatedMovies('dracula_1931', 6);
 */
export function useRelatedMovies(identifier, limit = 6, options = {}) {
  return useQuery({
    queryKey: ['related-movies', identifier, limit],
    
    queryFn: async () => {
      if (!identifier) {
        return { docs: [], numFound: 0 };
      }
      
      try {
        const result = await getRelatedMovies(identifier, limit);
        return result;
      } catch (error) {
        console.error(`Failed to fetch related movies for ${identifier}:`, error);
        // Return empty result instead of throwing
        return { docs: [], numFound: 0 };
      }
    },
    
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000,
    
    enabled: Boolean(identifier),
    refetchOnWindowFocus: false,
    retry: 1,
    
    ...options
  });
}

// ============================================
// COMBINED MOVIE DATA HOOK (Parallel Fetching)
// ============================================

/**
 * Hook for fetching complete movie data in parallel
 * Combines metadata, files, and related movies
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {Object} config - Configuration options
 * @returns {Object} Combined query results
 * 
 * @example
 * const { movie, files, related, isLoading } = useCompleteMovieData('dracula_1931');
 */
export function useCompleteMovieData(identifier, config = {}) {
  const {
    fetchFiles = true,
    fetchRelated = true,
    relatedLimit = 6
  } = config;

  // ✅ Fetch all data in parallel (TanStack Query handles this automatically)
  const movieQuery = useMovieDetails(identifier);
  const filesQuery = useMovieFiles(identifier, { 
    enabled: fetchFiles && Boolean(identifier) 
  });
  const relatedQuery = useRelatedMovies(identifier, relatedLimit, { 
    enabled: fetchRelated && Boolean(identifier) 
  });

  return {
    // Data
    movie: movieQuery.data,
    files: filesQuery.data || [],
    related: relatedQuery.data?.docs || [],
    
    // Loading states
    isLoading: movieQuery.isLoading || filesQuery.isLoading || relatedQuery.isLoading,
    isError: movieQuery.isError || filesQuery.isError || relatedQuery.isError,
    
    // Individual loading states (for granular UI control)
    movieLoading: movieQuery.isLoading,
    filesLoading: filesQuery.isLoading,
    relatedLoading: relatedQuery.isLoading,
    
    // Errors
    error: movieQuery.error || filesQuery.error || relatedQuery.error,
    movieError: movieQuery.error,
    filesError: filesQuery.error,
    relatedError: relatedQuery.error,
    
    // Refetch functions
    refetch: () => {
      movieQuery.refetch();
      if (fetchFiles) filesQuery.refetch();
      if (fetchRelated) relatedQuery.refetch();
    },
    refetchMovie: movieQuery.refetch,
    refetchFiles: filesQuery.refetch,
    refetchRelated: relatedQuery.refetch
  };
}

// ============================================
// PREFETCH UTILITIES
// ============================================

/**
 * Hook for prefetching movie data (useful for hover effects)
 * 
 * @returns {Function} Prefetch function
 * 
 * @example
 * const prefetchMovie = usePrefetchMovie();
 * <div onMouseEnter={() => prefetchMovie('dracula_1931')}>
 */
export function usePrefetchMovie() {
  const queryClient = useQueryClient();

  return (identifier) => {
    if (!identifier) return;

    // Prefetch movie metadata
    queryClient.prefetchQuery({
      queryKey: ['movie', identifier],
      queryFn: () => getMovieMetadata(identifier),
      staleTime: 30 * 60 * 1000
    });
  };
}

/**
 * Hook for prefetching category page
 * 
 * @returns {Function} Prefetch function
 * 
 * @example
 * const prefetchCategory = usePrefetchCategory();
 * <Link onMouseEnter={() => prefetchCategory('genre', 'horror')}>
 */
export function usePrefetchCategory() {
  const queryClient = useQueryClient();

  return (categoryType, categoryValue, page = 1) => {
    if (!categoryType || !categoryValue) return;

    queryClient.prefetchQuery({
      queryKey: ['movies', categoryType, categoryValue, page, 'downloads desc'],
      queryFn: () => searchByCategory(categoryType, categoryValue, page, 20, 'downloads desc'),
      staleTime: 5 * 60 * 1000
    });
  };
}

// ============================================
// INVALIDATION UTILITIES
// ============================================

/**
 * Hook for invalidating all movie-related queries
 * Useful for manual refresh
 * 
 * @returns {Function} Invalidate function
 * 
 * @example
 * const invalidateAll = useInvalidateMovies();
 * <button onClick={invalidateAll}>Refresh All</button>
 */
export function useInvalidateMovies() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] });
    queryClient.invalidateQueries({ queryKey: ['movie'] });
    queryClient.invalidateQueries({ queryKey: ['featured-movies'] });
    queryClient.invalidateQueries({ queryKey: ['related-movies'] });
  };
}

// ============================================
// EXPORTS
// ============================================

export default {
  useCategoryMovies,
  useFeaturedMovies,
  useMovieDetails,
  useMovieFiles,
  useRelatedMovies,
  useCompleteMovieData,
  usePrefetchMovie,
  usePrefetchCategory,
  useInvalidateMovies
};
