import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * Performance optimization ke liye — API calls reduce karta hai
 * 
 * @param {any} value - Jo value debounce karni hai
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Timer set karo
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function — previous timer cancel kare
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
