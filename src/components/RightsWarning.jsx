import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Rights Verification Warning Banner
 * ✅ LEGAL REQUIREMENT: AdSense compliance for public domain content
 * ✅ Displays disclaimer on all pages with dismiss functionality
 * ✅ localStorage to remember dismissed state (30 days expiry)
 * ✅ Accessibility: ARIA labels, keyboard navigation
 * 
 * @component
 * @example
 * <RightsWarning />
 */
export default function RightsWarning({ 
  identifier = null,
  showAlways = false 
}) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasUnclearRights, setHasUnclearRights] = useState(false);

  useEffect(() => {
    // Skip check if showAlways is true
    if (showAlways) {
      setIsDismissed(false);
      return;
    }

    try {
      // Check if user previously dismissed banner
      const dismissed = localStorage.getItem('rights-banner-dismissed');
      
      if (dismissed) {
        // Check expiry (30 days)
        const dismissedData = JSON.parse(dismissed);
        const expiryTime = dismissedData.timestamp + (30 * 24 * 60 * 60 * 1000); // 30 days
        
        if (Date.now() < expiryTime) {
          setIsDismissed(true);
        } else {
          // Expired, remove from storage
          localStorage.removeItem('rights-banner-dismissed');
        }
      }
    } catch (error) {
      console.error('Failed to check dismissed state:', error);
      localStorage.removeItem('rights-banner-dismissed');
    }

    // If identifier provided, check if it has unclear rights
    if (identifier) {
      // This would typically come from API response
      // For now, we show banner for all movies
      setHasUnclearRights(true);
    }
  }, [showAlways, identifier]);

  const handleDismiss = () => {
    try {
      const dismissData = {
        timestamp: Date.now(),
        dismissed: true
      };
      localStorage.setItem('rights-banner-dismissed', JSON.stringify(dismissData));
      setIsDismissed(true);
    } catch (error) {
      console.error('Failed to dismiss banner:', error);
    }
  };

  // Don't show if dismissed (unless showAlways is true)
  if (isDismissed && !showAlways) return null;

  return (
    <aside 
      className="bg-yellow-50 dark:bg-yellow-900/20 border-b-2 border-yellow-200 
                 dark:border-yellow-800 py-4 px-4 sticky top-0 z-40 shadow-sm"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Warning Content */}
          <div className="flex items-start gap-3 flex-1">
            {/* Warning Icon */}
            <div className="flex-shrink-0">
              <svg 
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            
            {/* Warning Text */}
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-yellow-900 dark:text-yellow-100">
                <strong className="font-bold">Public Domain Content Notice:</strong>{' '}
                All movies are sourced from{' '}
                <a 
                  href="https://archive.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-950 dark:hover:text-yellow-50 font-semibold transition-colors"
                >
                  Internet Archive
                </a>
                {' '}and marked as public domain or Creative Commons licensed.
              </p>
              
              <p className="text-xs mt-2 text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ Important:</strong> While we verify licensing status, users should{' '}
                <Link 
                  to="/about" 
                  className="underline hover:text-yellow-950 dark:hover:text-yellow-50 font-semibold transition-colors"
                >
                  independently verify rights
                </Link>
                {' '}before redistribution. See our{' '}
                <Link 
                  to="/dmca" 
                  className="underline hover:text-yellow-950 dark:hover:text-yellow-50 font-semibold transition-colors"
                >
                  DMCA policy
                </Link>
                {' '}for more information.
                {identifier && (
                  <span className="block mt-1">
                    <a 
                      href={`https://archive.org/details/${identifier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-yellow-950 dark:hover:text-yellow-50 font-semibold transition-colors"
                    >
                      Verify rights on Archive.org →
                    </a>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 sm:ml-4">
            {identifier && (
              <a
                href={`https://archive.org/details/${identifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-900 dark:text-yellow-100 hover:text-yellow-950 
                         dark:hover:text-yellow-50 text-xs font-semibold px-3 py-2 
                         rounded-md border border-yellow-300 dark:border-yellow-700
                         hover:bg-yellow-100 dark:hover:bg-yellow-800/40 
                         transition-colors flex items-center gap-1 whitespace-nowrap"
                aria-label="Verify movie rights on Internet Archive"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Verify Rights
              </a>
            )}
            
            {!showAlways && (
              <button
                onClick={handleDismiss}
                className="text-yellow-900 dark:text-yellow-100 hover:text-yellow-950 
                         dark:hover:text-yellow-50 text-xs font-semibold px-4 py-2 
                         rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-800/40 
                         transition-colors flex items-center gap-1 whitespace-nowrap
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Dismiss legal notice for 30 days"
                title="Dismiss for 30 days"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
