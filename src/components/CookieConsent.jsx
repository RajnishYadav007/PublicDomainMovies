import { useState, useEffect } from 'react';

/**
 * GDPR/CCPA compliant cookie consent banner
 * REQUIRED for AdSense approval
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies and third-party services (Google AdSense) to improve your experience. 
          By continuing, you accept our{' '}
          <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-semibold whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
