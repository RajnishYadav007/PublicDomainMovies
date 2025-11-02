import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


/**
 * Rights Verification Warning Banner
 * ✅ CRITICAL: AdSense & legal compliance for public domain content [web:2][web:17][web:21]
 * ✅ Displays disclaimer on all pages with dismiss functionality
 * ✅ Enhanced rights verification workflow with Archive.org direct links [web:17][web:21]
 * ✅ localStorage to remember dismissed state (30 days expiry)
 * ✅ Accessibility: ARIA labels, keyboard navigation, semantic HTML
 * ✅ Responds to metadata validation (shows stronger notice for unclear licenses) [web:17][web:21]
 * 
 * @component
 * @param {string} identifier - Movie identifier for Archive.org link
 * @param {boolean} showAlways - Force show banner (for About/policy pages)
 * @param {boolean} hasUnclearLicense - Flag if metadata validation found ambiguous license [web:17][web:21]
 * 
 * @example
 * <RightsWarning identifier="movie123" />
 * <RightsWarning showAlways={true} /> // About page
 */
export default function RightsWarning({ 
  identifier = null,
  showAlways = false,
  hasUnclearLicense = false  // ✅ NEW: Flag for ambiguous licenses [web:17][web:21]
}) {
  const [isDismissed, setIsDismissed] = useState(false);


  useEffect(() => {
    // Skip check if showAlways is true (for static pages like About, DMCA)
    if (showAlways) {
      setIsDismissed(false);
      return;
    }


    try {
      // ✅ Check if user previously dismissed banner [web:17][web:21]
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
  }, [showAlways]);


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


  // ✅ Determine banner styling based on license clarity [web:17][web:21]
  const isAmbiguous = hasUnclearLicense;
  const bannerBg = isAmbiguous 
    ? 'bg-red-50 dark:bg-red-900/20' 
    : 'bg-yellow-50 dark:bg-yellow-900/20';
  const bannerBorder = isAmbiguous
    ? 'border-b-2 border-red-200 dark:border-red-800'
    : 'border-b-2 border-yellow-200 dark:border-yellow-800';
  const iconColor = isAmbiguous
    ? 'text-red-600 dark:text-red-400'
    : 'text-yellow-600 dark:text-yellow-400';
  const textColor = isAmbiguous
    ? 'text-red-900 dark:text-red-100'
    : 'text-yellow-900 dark:text-yellow-100';
  const linkHoverColor = isAmbiguous
    ? 'hover:text-red-950 dark:hover:text-red-50'
    : 'hover:text-yellow-950 dark:hover:text-yellow-50';
  const buttonBgHover = isAmbiguous
    ? 'hover:bg-red-100 dark:hover:bg-red-800/40'
    : 'hover:bg-yellow-100 dark:hover:bg-yellow-800/40';
  const buttonBorder = isAmbiguous
    ? 'border-red-300 dark:border-red-700'
    : 'border-yellow-300 dark:border-yellow-700';
  const focusRing = isAmbiguous
    ? 'focus:ring-red-400'
    : 'focus:ring-yellow-400';


  return (
    <aside 
      className={`${bannerBg} ${bannerBorder} py-4 px-4 sticky top-0 z-40 shadow-sm`}
      role="region"
      aria-label="Rights verification notice"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Warning Content */}
          <div className="flex items-start gap-3 flex-1">
            {/* Warning Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <svg 
                className={`w-6 h-6 ${iconColor}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                {isAmbiguous ? (
                  // Error icon for unclear licenses [web:17][web:21]
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                ) : (
                  // Warning triangle for general notice [web:17][web:21]
                  <path 
                    fillRule="evenodd" 
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                )}
              </svg>
            </div>
            
            {/* Warning Text - Enhanced with rights verification workflow [web:17][web:21] */}
            <div className="flex-1">
              <h3 className={`text-sm font-bold ${textColor} mb-2`}>
                {isAmbiguous 
                  ? '⚠️ Rights Verification Required' 
                  : '📋 Public Domain Content Notice'}
              </h3>
              
              <p className={`text-sm leading-relaxed ${textColor}`}>
                {isAmbiguous ? (
                  <>
                    This movie's public domain status could <strong>not be automatically verified</strong> using Internet Archive metadata fields 
                    (licenseurl, rights). <strong>You must independently verify</strong> the copyright status on 
                    <a 
                      href="https://archive.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`underline ${linkHoverColor} font-semibold transition-colors mx-1`}
                    >
                      Archive.org
                    </a>
                    before viewing, downloading, or sharing this content. [web:17][web:21]
                  </>
                ) : (
                  <>
                    All movies are sourced from 
                    <a 
                      href="https://archive.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`underline ${linkHoverColor} font-semibold transition-colors mx-1`}
                    >
                      Internet Archive
                    </a>
                    and marked as public domain or Creative Commons licensed.
                  </>
                )}
              </p>
              
              <p className={`text-xs mt-2 ${textColor} space-y-1`}>
                <div>
                  <strong>Important:</strong> While we verify licensing through metadata (licenseurl, rights, collection), 
                  users remain responsible for <strong>independent verification</strong> before redistribution or commercial use. [web:17][web:21]
                </div>
                <div className="mt-2">
                  Learn more: 
                  <Link 
                    to="/about" 
                    className={`underline ${linkHoverColor} font-semibold transition-colors ml-1`}
                  >
                    About Our Rights Process
                  </Link>
                  {' '}|{' '}
                  <Link 
                    to="/dmca" 
                    className={`underline ${linkHoverColor} font-semibold transition-colors`}
                  >
                    DMCA Policy
                  </Link>
                </div>
              </p>

              {/* Direct Archive.org link for this specific movie [web:17][web:21] */}
              {identifier && (
                <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-800">
                  <a 
                    href={`https://archive.org/details/${identifier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs underline ${linkHoverColor} font-semibold transition-colors inline-flex items-center gap-1`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Verify Rights on Archive.org
                  </a>
                </div>
              )}
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 sm:ml-4">
            {/* "Verify Rights" button for specific movies [web:17][web:21] */}
            {identifier && !isAmbiguous && (
              <a
                href={`https://archive.org/details/${identifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textColor} text-xs font-semibold px-3 py-2 
                         rounded-md border ${buttonBorder}
                         ${buttonBgHover} transition-colors flex items-center gap-1 whitespace-nowrap
                         focus:outline-none focus:ring-2 ${focusRing}`}
                aria-label="Verify movie rights on Internet Archive"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Verify
              </a>
            )}
            
            {/* Dismiss button - NOT shown on static pages (showAlways) [web:17][web:21] */}
            {!showAlways && (
              <button
                onClick={handleDismiss}
                className={`${textColor} text-xs font-semibold px-4 py-2 
                         rounded-md ${buttonBgHover} transition-colors flex items-center gap-1 whitespace-nowrap
                         focus:outline-none focus:ring-2 ${focusRing}`}
                aria-label={`Dismiss ${isAmbiguous ? 'rights verification notice' : 'legal notice'} for 30 days`}
                title={`Dismiss for 30 days`}
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
