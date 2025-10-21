import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with React state synchronization
 * ✅ Features:
 * - Automatic JSON serialization/deserialization
 * - SSR-safe (checks for window)
 * - Error handling with fallback values
 * - Synchronization across tabs/windows
 * - TypeScript-friendly
 * - Expiry support (optional)
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @param {Object} options - Configuration options
 * @returns {Array} [storedValue, setValue, removeValue]
 * 
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 * 
 * @module hooks/useLocalStorage
 */
export function useLocalStorage(key, initialValue, options = {}) {
  const {
    raw = false,           // If true, don't JSON stringify/parse
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncData = true,       // Sync across tabs
    expiryTime = null      // Expiry time in milliseconds (null = no expiry)
  } = options;

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  /**
   * Check if localStorage is available (SSR-safe)
   */
  const isLocalStorageAvailable = useCallback(() => {
    try {
      if (typeof window === 'undefined') return false;
      const testKey = '__test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  /**
   * Read value from localStorage with error handling
   */
  const readValue = useCallback(() => {
    // Return initial value if localStorage not available
    if (!isLocalStorageAvailable()) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      // Return initial value if key doesn't exist
      if (item === null) {
        return initialValue;
      }

      // If raw mode, return as-is
      if (raw) {
        return item;
      }

      // Parse JSON
      const parsedItem = deserializer(item);

      // Check expiry if expiryTime option is set
      if (expiryTime && parsedItem && typeof parsedItem === 'object' && parsedItem.__expires) {
        const now = Date.now();
        if (now > parsedItem.__expires) {
          // Expired, remove from storage
          window.localStorage.removeItem(key);
          return initialValue;
        }
        // Return value without expiry metadata
        return parsedItem.value;
      }

      return parsedItem;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, raw, deserializer, expiryTime, isLocalStorageAvailable]);

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [storedValue, setStoredValue] = useState(readValue);

  /**
   * Set value to localStorage and state
   */
  const setValue = useCallback((value) => {
    // Allow value to be a function (like useState)
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    // Save to state
    setStoredValue(valueToStore);

    // Save to localStorage
    if (isLocalStorageAvailable()) {
      try {
        let itemToStore = valueToStore;

        // Add expiry metadata if expiryTime is set
        if (expiryTime) {
          itemToStore = {
            value: valueToStore,
            __expires: Date.now() + expiryTime
          };
        }

        // Serialize or store raw
        const serializedValue = raw 
          ? String(itemToStore) 
          : serializer(itemToStore);

        window.localStorage.setItem(key, serializedValue);

        // Dispatch storage event for cross-tab sync
        if (syncData) {
          window.dispatchEvent(new StorageEvent('storage', {
            key,
            newValue: serializedValue,
            oldValue: window.localStorage.getItem(key),
            storageArea: window.localStorage,
            url: window.location.href
          }));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue, raw, serializer, expiryTime, syncData, isLocalStorageAvailable]);

  /**
   * Remove value from localStorage and reset state to initial value
   */
  const removeValue = useCallback(() => {
    setStoredValue(initialValue);

    if (isLocalStorageAvailable()) {
      try {
        window.localStorage.removeItem(key);

        // Dispatch storage event for cross-tab sync
        if (syncData) {
          window.dispatchEvent(new StorageEvent('storage', {
            key,
            newValue: null,
            oldValue: window.localStorage.getItem(key),
            storageArea: window.localStorage,
            url: window.location.href
          }));
        }
      } catch (error) {
        console.warn(`Error removing localStorage key "${key}":`, error);
      }
    }
  }, [key, initialValue, syncData, isLocalStorageAvailable]);

  // ============================================
  // EFFECTS
  // ============================================

  /**
   * Listen for changes to localStorage from other tabs/windows
   */
  useEffect(() => {
    if (!syncData || !isLocalStorageAvailable()) return;

    const handleStorageChange = (e) => {
      // Only update if the changed key matches our key
      if (e.key !== key || e.storageArea !== window.localStorage) return;

      try {
        // If value was removed
        if (e.newValue === null) {
          setStoredValue(initialValue);
          return;
        }

        // Parse new value
        const newValue = raw 
          ? e.newValue 
          : deserializer(e.newValue);

        // Check expiry
        if (expiryTime && newValue && typeof newValue === 'object' && newValue.__expires) {
          if (Date.now() > newValue.__expires) {
            setStoredValue(initialValue);
            return;
          }
          setStoredValue(newValue.value);
        } else {
          setStoredValue(newValue);
        }
      } catch (error) {
        console.warn(`Error handling storage change for key "${key}":`, error);
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue, raw, deserializer, syncData, expiryTime, isLocalStorageAvailable]);

  /**
   * Check for expiry on mount and set up interval for periodic checks
   */
  useEffect(() => {
    if (!expiryTime || !isLocalStorageAvailable()) return;

    // Check expiry on mount
    const currentValue = readValue();
    if (currentValue === initialValue) {
      // Value was expired and removed
      setStoredValue(initialValue);
    }

    // Set up interval to check expiry every minute
    const intervalId = setInterval(() => {
      const value = readValue();
      if (value === initialValue && storedValue !== initialValue) {
        // Value expired during interval
        setStoredValue(initialValue);
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [expiryTime, readValue, initialValue, storedValue, isLocalStorageAvailable]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing localStorage with automatic expiry
 * Wrapper around useLocalStorage with expiry preset
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value
 * @param {number} expiryTime - Expiry time in milliseconds
 * 
 * @example
 * // Store search query for 1 hour
 * const [query, setQuery] = useLocalStorageWithExpiry('search', '', 3600000);
 */
export function useLocalStorageWithExpiry(key, initialValue, expiryTime) {
  return useLocalStorage(key, initialValue, { expiryTime });
}

/**
 * Hook for managing localStorage as raw string (no JSON parsing)
 * 
 * @param {string} key - localStorage key
 * @param {string} initialValue - Default value
 * 
 * @example
 * const [token, setToken] = useLocalStorageRaw('auth_token', '');
 */
export function useLocalStorageRaw(key, initialValue) {
  return useLocalStorage(key, initialValue, { raw: true });
}

/**
 * Hook for managing localStorage without cross-tab sync
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value
 * 
 * @example
 * const [scrollPos, setScrollPos] = useLocalStorageNoSync('scroll_position', 0);
 */
export function useLocalStorageNoSync(key, initialValue) {
  return useLocalStorage(key, initialValue, { syncData: false });
}

/**
 * Hook for checking if localStorage is available
 * Useful for conditional rendering
 * 
 * @returns {boolean} true if localStorage is available
 * 
 * @example
 * const hasLocalStorage = useLocalStorageAvailable();
 * if (!hasLocalStorage) return <NoStorageWarning />;
 */
export function useLocalStorageAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const testKey = '__test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      setAvailable(true);
    } catch (e) {
      setAvailable(false);
    }
  }, []);

  return available;
}

// Export default
export default useLocalStorage;
