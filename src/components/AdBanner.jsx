import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


/**
 * Google AdSense banner component - AdSense Policy Compliant
 * ✅ CRITICAL: Only renders ads when page has substantial content (250+ words)
 * ✅ Blocks ads on utility/error/no-content screens (404, empty search, etc.)
 * ✅ Route blacklist prevents policy violations
 * ⚠️ HUMAN REVIEW: Replace client ID with your approved AdSense ID in .env
 */
export default function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '',
  minWords = 250  // Minimum word count required to show ads [web:2][web:43]
}) {
  const adRef = useRef(null);
  const location = useLocation();
  const [shouldRenderAd, setShouldRenderAd] = useState(false);


  // ✅ CRITICAL: Route blacklist - NEVER show ads on these pages [web:2][web:22]
  const blockedRoutes = [
    '/404',
    '/not-found',
    '/error',
    '/sitemap',
    '/robots.txt',
    '/ads.txt',
    '/thank-you',
    '/login',
    '/signup',
    '/register',
    '/reset-password',
    '/verify-email',
    '/unsubscribe'
  ];


  useEffect(() => {
    // ⚠️ Policy Check 1: Block ads on utility/error pages [web:2][web:22]
    const currentPath = location.pathname.toLowerCase();
    const isBlockedRoute = blockedRoutes.some(route => currentPath.includes(route));
    
    if (isBlockedRoute) {
      console.log('AdBanner: Blocked on utility/error page:', currentPath);
      setShouldRenderAd(false);
      return;
    }


    // ⚠️ Policy Check 2: Verify substantial content on page [web:2][web:43]
    const checkContentAndRender = () => {
      // Get all text content from main content areas (exclude header, footer, nav)
      const mainContent = document.querySelector('main') || document.querySelector('article') || document.body;
      const textContent = mainContent.innerText || mainContent.textContent || '';
      
      // Count words (split by whitespace, filter empty strings)
      const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
      
      console.log(`AdBanner: Page word count = ${wordCount}, minimum required = ${minWords}`);
      
      // ✅ Only render ad if page has substantial content [web:2][web:43]
      if (wordCount >= minWords) {
        setShouldRenderAd(true);
      } else {
        console.warn(`AdBanner: Insufficient content (${wordCount} words < ${minWords} required). Ad blocked per AdSense policy.`);
        setShouldRenderAd(false);
      }
    };


    // Wait for content to fully render before checking word count
    const timer = setTimeout(checkContentAndRender, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname, minWords]);


  useEffect(() => {
    if (!shouldRenderAd) return;


    // ⚠️ HUMAN REVIEW REQUIRED: Verify AdSense client ID in .env [web:22]
    const clientId = import.meta.env.VITE_GOOGLE_ADSENSE_ID;
    
    if (!clientId || clientId === 'ca-pub-XXXXXXXXXXXXXXXX') {
      console.warn('⚠️ AdSense client ID not configured. Set VITE_GOOGLE_ADSENSE_ID in .env file.');
      return;
    }


    // ⚠️ Policy Check 3: Ensure AdSense script loads after content [web:2][web:22]
    try {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        // Wait for script to load before pushing ad
        script.onload = () => {
          if (adRef.current) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        };
      } else {
        // Script already loaded, push ad immediately
        if (adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [shouldRenderAd]);


  // ✅ CRITICAL: Don't render ad container if policy checks fail [web:2][web:22]
  if (!shouldRenderAd) {
    return null;
  }


  return (
    <div className={`ad-container my-6 ${className}`} aria-label="Advertisement">
      {/* HUMAN REVIEW: Ensure ad placements follow AdSense guidelines [web:22] */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-1">
        Advertisement
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
