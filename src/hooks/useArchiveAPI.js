import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  searchPublicDomainMovies,
  searchByCategory,
  advancedSearch,
  getMovieMetadata,
  getMovieFiles,
  getFeaturedMovies,
  getMoviesByCollection,
  getRelatedMovies
} from '../utils/archiveAPI';

/**
 * Custom Hooks for Archive.org API with TanStack Query
 * ✅ Features:
 * - Automatic caching and background refetching
 * - Loading, error, and success states
 * - Retry logic on failures
 * - Optimistic updates
 * - Query invalidation
 * 
 * @module hooks/useArchiveAPI
 */

// ============================================
// SEARCH HOOKS
// ============================================

/**
 * Hook for searching public domain movies
 * 
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} rows - Results per page (default: 20)
 * @param {Object} options - TanStack Query options
 * @returns {Object} Query result with data, isLoading, error
 * 
 * @example
 * const { data, isLoading, error } = useSearchMovies('dracula', 1);
 */
export const useSearchMovies = (query, page = 1, rows = 20, options = {}) => {
  return useQuery({
    queryKey: ['search-movies', query, page, rows],
    queryFn: async () => {
      if (!query || query.trim().length < 2) {
        return { docs: [], numFound: 0, start: 0 };
      }
      return searchPublicDomainMovies(query, page, rows);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: Boolean(query?.trim().length >= 2), // Only run if query is valid
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

/**
 * Hook for searching movies by category
 * 
 * @param {string} categoryType - 'genre' | 'decade' | 'language' | 'year'
 * @param {string} categoryValue - Category value (e.g., 'horror', '1920s')
 * @param {number} page - Page number
 * @param {number} rows - Results per page
 * @param {string} sort - Sort order (e.g., 'downloads desc')
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const { data, isLoading } = useCategoryMovies('genre', 'horror', 1, 20);
 */
export const useCategoryMovies = (
  categoryType, 
  categoryValue, 
  page = 1, 
  rows = 20, 
  sort = 'downloads desc',
  options = {}
) => {
  return useQuery({
    queryKey: ['category-movies', categoryType, categoryValue, page, rows, sort],
    queryFn: () => searchByCategory(categoryType, categoryValue, page, rows, sort),
    staleTime: 1000 * 60 * 15, // 15 minutes (categories change less frequently)
    gcTime: 1000 * 60 * 30,
    enabled: Boolean(categoryType && categoryValue),
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

/**
 * Hook for advanced search with multiple filters
 * 
 * @param {Object} filters - Filter object
 * @param {number} page - Page number
 * @param {number} rows - Results per page
 * @param {string} sort - Sort order
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const filters = { genre: 'horror', decade: '1930s', language: 'english' };
 * const { data, isLoading } = useAdvancedSearch(filters, 1);
 */
export const useAdvancedSearch = (
  filters = {}, 
  page = 1, 
  rows = 20, 
  sort = 'downloads desc',
  options = {}
) => {
  return useQuery({
    queryKey: ['advanced-search', filters, page, rows, sort],
    queryFn: () => advancedSearch(filters, page, rows, sort),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    enabled: Object.keys(filters).length > 0, // Only run if filters exist
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

// ============================================
// MOVIE DETAIL HOOKS
// ============================================

/**
 * Hook for fetching movie metadata by identifier
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const { data: movie, isLoading } = useMovieMetadata('dracula_1931');
 */
export const useMovieMetadata = (identifier, options = {}) => {
  return useQuery({
    queryKey: ['movie-metadata', identifier],
    queryFn: () => getMovieMetadata(identifier),
    staleTime: 1000 * 60 * 30, // 30 minutes (metadata doesn't change often)
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: Boolean(identifier),
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

/**
 * Hook for fetching movie files (download links)
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const { data: files, isLoading } = useMovieFiles('dracula_1931');
 */
export const useMovieFiles = (identifier, options = {}) => {
  return useQuery({
    queryKey: ['movie-files', identifier],
    queryFn: () => getMovieFiles(identifier),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60,
    enabled: Boolean(identifier),
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

/**
 * Hook for fetching related movies
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {number} limit - Number of related movies (default: 6)
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const { data: related, isLoading } = useRelatedMovies('dracula_1931', 6);
 */
export const useRelatedMovies = (identifier, limit = 6, options = {}) => {
  return useQuery({
    queryKey: ['related-movies', identifier, limit],
    queryFn: () => getRelatedMovies(identifier, limit),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30,
    enabled: Boolean(identifier),
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

// ============================================
// FEATURED & COLLECTION HOOKS
// ============================================

/**
 * Hook for fetching featured/popular movies
 * 
 * @param {number} limit - Number of movies to fetch (default: 12)
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const { data: featured, isLoading } = useFeaturedMovies(12);
 */
export const useFeaturedMovies = (limit = 12, options = {}) => {
  return useQuery({
    queryKey: ['featured-movies', limit],
    queryFn: () => getFeaturedMovies(limit),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

/**
 * Hook for fetching movies by collection
 * 
 * @param {string} collection - Collection name (e.g., 'prelinger')
 * @param {number} page - Page number
 * @param {number} rows - Results per page
 * @param {Object} options - TanStack Query options
 * 
 * @example
 * const { data, isLoading } = useCollectionMovies('prelinger', 1, 20);
 */
export const useCollectionMovies = (
  collection = 'prelinger', 
  page = 1, 
  rows = 20, 
  options = {}
) => {
  return useQuery({
    queryKey: ['collection-movies', collection, page, rows],
    queryFn: () => getMoviesByCollection(collection, page, rows),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30,
    enabled: Boolean(collection),
    retry: 2,
    refetchOnWindowFocus: false,
    ...options
  });
};

// ============================================
// COMBINED HOOKS (Fetch Multiple Data)
// ============================================

/**
 * Hook for fetching complete movie details (metadata + files + related)
 * Fetches all data in parallel for movie detail page
 * 
 * @param {string} identifier - Archive.org identifier
 * @param {Object} options - Configuration options
 * 
 * @example
 * const { movie, files, related, isLoading } = useMovieDetails('dracula_1931');
 */
export const useMovieDetails = (identifier, options = {}) => {
  const { 
    fetchFiles = true, 
    fetchRelated = true, 
    relatedLimit = 6 
  } = options;

  const movieQuery = useMovieMetadata(identifier);
  const filesQuery = useMovieFiles(identifier, { enabled: fetchFiles && Boolean(identifier) });
  const relatedQuery = useRelatedMovies(identifier, relatedLimit, { 
    enabled: fetchRelated && Boolean(identifier) 
  });

  return {
    movie: movieQuery.data,
    files: filesQuery.data || [],
    related: relatedQuery.data?.docs || [],
    isLoading: movieQuery.isLoading || filesQuery.isLoading || relatedQuery.isLoading,
    isError: movieQuery.isError || filesQuery.isError || relatedQuery.isError,
    error: movieQuery.error || filesQuery.error || relatedQuery.error,
    refetch: () => {
      movieQuery.refetch();
      if (fetchFiles) filesQuery.refetch();
      if (fetchRelated) relatedQuery.refetch();
    }
  };
};

// ============================================
// MUTATION HOOKS (for future features)
// ============================================

/**
 * Hook for adding movie to favorites (localStorage-based)
 * Future: Can be connected to backend API
 * 
 * @example
 * const addToFavorites = useAddToFavorites();
 * addToFavorites.mutate({ identifier: 'dracula_1931', title: 'Dracula' });
 */
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      // Check if already exists
      if (favorites.some(fav => fav.identifier === movie.identifier)) {
        throw new Error('Movie already in favorites');
      }

      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return movie;
    },
    onSuccess: () => {
      // Invalidate favorites query
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (error) => {
      console.error('Failed to add to favorites:', error);
    }
  });
};

/**
 * Hook for removing movie from favorites
 * 
 * @example
 * const removeFromFavorites = useRemoveFromFavorites();
 * removeFromFavorites.mutate('dracula_1931');
 */
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (identifier) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updated = favorites.filter(fav => fav.identifier !== identifier);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return identifier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
};

/**
 * Hook for fetching user favorites (localStorage-based)
 * 
 * @example
 * const { data: favorites, isLoading } = useFavorites();
 */
export const useFavorites = (options = {}) => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
    ...options
  });
};

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook for prefetching movie data (for hover effects, etc.)
 * 
 * @param {string} identifier - Archive.org identifier
 * 
 * @example
 * const prefetchMovie = usePrefetchMovie();
 * <div onMouseEnter={() => prefetchMovie('dracula_1931')}>
 */
export const usePrefetchMovie = () => {
  const queryClient = useQueryClient();

  return (identifier) => {
    queryClient.prefetchQuery({
      queryKey: ['movie-metadata', identifier],
      queryFn: () => getMovieMetadata(identifier),
      staleTime: 1000 * 60 * 30
    });
  };
};

/**
 * Hook for invalidating all movie-related queries
 * Useful for refresh functionality
 * 
 * @example
 * const invalidateMovies = useInvalidateMovies();
 * <button onClick={invalidateMovies}>Refresh</button>
 */
export const useInvalidateMovies = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['search-movies'] });
    queryClient.invalidateQueries({ queryKey: ['category-movies'] });
    queryClient.invalidateQueries({ queryKey: ['featured-movies'] });
    queryClient.invalidateQueries({ queryKey: ['movie-metadata'] });
  };
};

// ============================================
// EXPORT DEFAULT OBJECT
// ============================================

export default {
  // Search hooks
  useSearchMovies,
  useCategoryMovies,
  useAdvancedSearch,
  
  // Movie detail hooks
  useMovieMetadata,
  useMovieFiles,
  useRelatedMovies,
  useMovieDetails,
  
  // Featured/Collection hooks
  useFeaturedMovies,
  useCollectionMovies,
  
  // Mutation hooks
  useAddToFavorites,
  useRemoveFromFavorites,
  useFavorites,
  
  // Utility hooks
  usePrefetchMovie,
  useInvalidateMovies
};
