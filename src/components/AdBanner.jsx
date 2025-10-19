import { useEffect, useRef } from 'react';

/**
 * Google AdSense banner component
 * ⚠️ IMPORTANT: Replace client ID with your approved AdSense ID
 * POLICY: Ads must not obstruct content, follow AdSense guidelines
 */
export default function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '' 
}) {
  const adRef = useRef(null);

  useEffect(() => {
    // ⚠️ HUMAN REVIEW REQUIRED: Add your AdSense client ID
    const clientId = import.meta.env.VITE_GOOGLE_ADSENSE_ID;
    
    if (!clientId || clientId === 'ca-pub-XXXXXXXXXXXXXXXX') {
      console.warn('⚠️ AdSense client ID not configured. Ads will not display.');
      return;
    }

    try {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-ad-client', clientId);
        document.head.appendChild(script);
      }

      // Push ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container my-4 ${className}`} aria-label="Advertisement">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
