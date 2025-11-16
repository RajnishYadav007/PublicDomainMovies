import { Helmet } from 'react-helmet-async';

/**
 * Comprehensive SEO Component with Full Meta Tags and JSON-LD
 * ✅ Google Search optimization
 * ✅ Social media sharing (Open Graph, Twitter Cards)
 * ✅ JSON-LD structured data injection
 * ✅ AdSense-friendly meta directives
 * ✅ No duplicate tags (viewport, favicons handled in index.html)
 * 
 * @component
 * @param {string} title - Page title (appended with site name)
 * @param {string} description - Meta description (155–160 chars recommended)
 * @param {string} canonical - Canonical URL (prevents duplicate content)
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
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://publicdomainmovie.vercel.app';
  const siteName = import.meta.env.VITE_SITE_NAME || 'Archive Movies - Public Domain Classics';
  const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || 
    'Watch free public domain classic movies online from Internet Archive. Stream vintage cinema from 1890s-1970s.';
  
  // ✅ Construct full title
  const fullTitle = title 
    ? `${title} | ${siteName}` 
    : siteName;
  
  // ✅ Use provided description or site default (truncate at 160 chars)
  const fullDescription = description && description.length > 0
    ? description.slice(0, 160) // Google truncates at ~160 chars
    : siteDescription;
  
  // ✅ Ensure canonical URL is absolute
  const canonicalUrl = canonical && canonical.startsWith('http')
    ? canonical
    : canonical
      ? `${siteUrl}${canonical}`
      : siteUrl;
  
  // ✅ Fallback Open Graph image
  const ogImageUrl = ogImage && ogImage.startsWith('http')
    ? ogImage
    : ogImage
      ? `${siteUrl}${ogImage}`
      : `${siteUrl}/og-default.jpg`;

  // ✅ Determine robots directive
  const robotsDirective = noindex 
    ? 'noindex, nofollow' 
    : robots;

  // ✅ Handle schemaMarkup array or single object
  const schemaArray = Array.isArray(schemaMarkup) 
    ? schemaMarkup 
    : schemaMarkup 
      ? [schemaMarkup] 
      : [];

  return (
    <Helmet>
      {/* ========== PRIMARY META TAGS ========== */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
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
      
      {/* Twitter creator (optional, update if you have verified account) */}
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
      
      {/* ========== Alternative schema format for edge cases ========== */}
      {/* If schemaMarkup is a string (pre-formatted JSON), inject directly */}
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
