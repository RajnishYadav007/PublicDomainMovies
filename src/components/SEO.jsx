import { Helmet } from 'react-helmet-async';

/**
 * Comprehensive SEO Component with Full Meta Tags and JSON-LD
 * ✅ Google Search optimization
 * ✅ Social media sharing (Open Graph, Twitter Cards)
 * ✅ JSON-LD structured data injection
 * ✅ AdSense-friendly meta directives
 * ✅ Self-referencing canonical tags (SEO best practice)
 * ✅ No duplicate tags (viewport, favicons handled in index.html)
 * 
 * @component
 * @param {string} title - Page title (appended with site name)
 * @param {string} description - Meta description (155–160 chars recommended)
 * @param {string} canonical - Canonical URL path (e.g., "/about" or full URL)
 * @param {string} ogImage - Open Graph image URL (social sharing)
 * @param {Array|Object} schemaMarkup - JSON-LD schema (Movie, BreadcrumbList, etc.)
 * @param {string} type - og:type (website, video.movie, article, etc.)
 * @param {string} robots - Robots directive (default: index, follow)
 * @param {boolean} noindex - Set to true to exclude from indexing
 * 
 * @example
 * <SEO
 *   title="Watch Example Movie"
 *   description="Stream example movie free online"
 *   canonical="/movie/example"
 *   schemaMarkup={generateMovieSchema(movie)}
 * />
 */
export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  schemaMarkup,
  type = 'website',
  robots = 'index, follow',
  noindex = false
}) {
  // ✅ Get environment variables with updated defaults
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://publicdomainmovie.vercel.app';
  const siteName = import.meta.env.VITE_SITE_NAME || 'Public Domain Movies - Free Classic Films';
  const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || 
    'Watch free public domain classic movies online from Internet Archive. Stream vintage films from 1890s-1970s legally without registration.';
  
  // ✅ Construct full title
  const fullTitle = title 
    ? `${title} | ${siteName}` 
    : siteName;
  
  // ✅ Use provided description or site default (truncate at 160 chars)
  const fullDescription = description && description.length > 0
    ? description.slice(0, 160) // Google truncates at ~160 chars
    : siteDescription.slice(0, 160);
  
  // ✅ CRITICAL FIX: Ensure canonical URL is ALWAYS absolute and self-referencing
  const canonicalUrl = (() => {
    // If canonical prop is provided
    if (canonical) {
      // If already absolute URL (starts with http:// or https://)
      if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
        return canonical;
      }
      // If relative path, make it absolute with siteUrl
      const path = canonical.startsWith('/') ? canonical : `/${canonical}`;
      return `${siteUrl}${path}`;
    }
    
    // Default: Use current page URL (self-referencing canonical - SEO best practice)
    // This prevents duplicate content issues from query params, trailing slashes, etc.
    if (typeof window !== 'undefined') {
      // Remove query parameters and hash from current URL
      const currentPath = window.location.pathname;
      return `${siteUrl}${currentPath}`;
    }
    
    // Fallback to homepage (SSR or initial render)
    return siteUrl;
  })();
  
  // ✅ Fallback Open Graph image with absolute URL
  const ogImageUrl = (() => {
    if (!ogImage) {
      return `${siteUrl}/og-default.jpg`;
    }
    if (ogImage.startsWith('http://') || ogImage.startsWith('https://')) {
      return ogImage;
    }
    const imagePath = ogImage.startsWith('/') ? ogImage : `/${ogImage}`;
    return `${siteUrl}${imagePath}`;
  })();

  // ✅ Determine robots directive
  const robotsDirective = noindex 
    ? 'noindex, nofollow' 
    : robots;

  // ✅ Handle schemaMarkup array or single object
  const schemaArray = Array.isArray(schemaMarkup) 
    ? schemaMarkup 
    : schemaMarkup && typeof schemaMarkup === 'object'
      ? [schemaMarkup] 
      : [];

  return (
    <Helmet>
      {/* ========== PRIMARY META TAGS ========== */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* ✅ CRITICAL: Self-referencing canonical tag (prevents duplicate content) */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* ========== OPEN GRAPH / FACEBOOK ========== */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* ========== TWITTER CARD ========== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Twitter creator (optional - uncomment when you have a verified account) */}
      {/* <meta name="twitter:creator" content="@yourusername" /> */}
      
      {/* ========== SEARCH ENGINE DIRECTIVES ========== */}
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <meta name="bingbot" content={robotsDirective} />
      
      {/* ========== PRECONNECT TO EXTERNAL RESOURCES (Performance) ========== */}
      <link rel="preconnect" href="https://archive.org" />
      <link rel="dns-prefetch" href="https://archive.org" />
      
      {/* ========== JSON-LD STRUCTURED DATA ========== */}
      {/* Multiple schemas support (Movie + BreadcrumbList, etc.) */}
      {schemaArray.length > 0 && (
        schemaArray.map((schema, index) => (
          <script 
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema)
            }}
          />
        ))
      )}
      
      {/* ========== Alternative schema format for pre-formatted JSON strings ========== */}
      {typeof schemaMarkup === 'string' && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schemaMarkup
          }}
        />
      )}
    </Helmet>
  );
}
