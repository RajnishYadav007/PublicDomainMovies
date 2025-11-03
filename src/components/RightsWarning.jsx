import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Rights Verification Warning Banner - Compact Top Bar
 * ✅ Shows on all pages at top (header level)
 * ✅ Dismissible for 30 days
 * ✅ NOT inside page content (stays at top)
 * ✅ Simple, clean design
 */
export default function RightsWarning() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('rights-banner-dismissed');
      if (dismissed) {
        const dismissedData = JSON.parse(dismissed);
        const expiryTime = dismissedData.timestamp + (30 * 24 * 60 * 60 * 1000);
        
        if (Date.now() < expiryTime) {
          setIsDismissed(true);
          return;
        }
        localStorage.removeItem('rights-banner-dismissed');
      }
    } catch (error) {
      console.error('Error checking dismissed state:', error);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem('rights-banner-dismissed', JSON.stringify({
        timestamp: Date.now(),
        dismissed: true
      }));
      setIsDismissed(true);
    } catch (error) {
      console.error('Error dismissing banner:', error);
    }
  };

  if (isDismissed) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 py-2 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Message */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          
          <p className="text-xs sm:text-sm text-yellow-900 dark:text-yellow-100 truncate">
            <strong>Public Domain:</strong> All content from Internet Archive. 
            <Link to="/about" className="underline hover:text-yellow-950 dark:hover:text-yellow-50 ml-1">
              Learn more
            </Link>
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="text-yellow-900 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-800/40 p-1 rounded flex-shrink-0 transition-colors"
          aria-label="Dismiss notice"
          title="Dismiss for 30 days"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
