import { Helmet } from 'react-helmet-async';


/**
 * Comprehensive SEO Component with Full Meta Tags and JSON-LD
 * ✅ Google Search optimization
 * ✅ Social media sharing (Open Graph, Twitter Cards)
 * ✅ JSON-LD structured data injection
 * ✅ AdSense-friendly meta directives
 * ✅ Accessibility & searchability
 * 
 * @component
 * @param {string} title - Page title (appended with site name)
 * @param {string} description - Meta description (155–160 chars recommended)
 * @param {string} canonical - Canonical URL (prevents duplicate content)
 * @param {string} ogImage - Open Graph image URL (social sharing)
 * @param {Array|Object} schemaMarkup - JSON-LD schema (Movie, BreadcrumbList, etc.)
 * @param {string} type - og:type (website, video.movie, article, etc.)
 * @param {boolean} robots - Include robots meta (default: index, follow)
 * @param {string} noindex - Set to true to exclude from indexing
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
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://archivemovies.vercel.app';
  const siteName = import.meta.env.VITE_SITE_NAME || 'Archive Movies - Public Domain Classics';
  const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || 
    'Watch free public domain classic movies online from Internet Archive. Stream vintage cinema from 1890s-1970s.';
  
  // ✅ Construct full title [web:36]
  const fullTitle = title 
    ? `${title} | ${siteName}` 
    : siteName;
  
  // ✅ Use provided description or site default [web:36]
  const fullDescription = description && description.length > 0
    ? description.slice(0, 160) // Google truncates at ~160 chars
    : siteDescription;
  
  // ✅ Ensure canonical URL is absolute [web:36]
  const canonicalUrl = canonical && canonical.startsWith('http')
    ? canonical
    : canonical
      ? `${siteUrl}${canonical}`
      : siteUrl;
  
  // ✅ Fallback Open Graph image [web:36]
  const ogImageUrl = ogImage && ogImage.startsWith('http')
    ? ogImage
    : ogImage
      ? `${siteUrl}${ogImage}`
      : `${siteUrl}/og-default.jpg`;

  // ✅ Determine robots directive [web:36]
  const robotsDirective = noindex 
    ? 'noindex, nofollow' 
    : robots;


  // ✅ Handle schemaMarkup array or single object [web:36]
  const schemaArray = Array.isArray(schemaMarkup) 
    ? schemaMarkup 
    : schemaMarkup 
      ? [schemaMarkup] 
      : [];


  return (
    <Helmet>
      {/* ========== PRIMARY META TAGS ========== [web:36] */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* ========== OPEN GRAPH / FACEBOOK [web:36] ========== */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Open Graph: Locale for international reach [web:36] */}
      <meta property="og:locale" content="en_US" />
      
      {/* ========== TWITTER CARD [web:36] ========== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Twitter creator (optional, update if you have verified account) [web:36] */}
      {/* <meta name="twitter:creator" content="@archivemovies" /> */}
      
      {/* ========== SEARCH ENGINE DIRECTIVES [web:36] */}
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <meta name="bingbot" content={robotsDirective} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* ========== ACCESSIBILITY & COMPATIBILITY [web:36] */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0066ff" />
      <meta name="color-scheme" content="light dark" />
      
      {/* ========== GOOGLE VERIFICATION [web:36] */}
      {/* ⚠️ HUMAN REVIEW: Add your Google Search Console verification code [web:36] */}
      {import.meta.env.VITE_GOOGLE_SITE_VERIFICATION && (
        <meta 
          name="google-site-verification" 
          content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION} 
        />
      )}
      
      {/* ========== BING VERIFICATION (optional) [web:36] */}
      {/* 
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      */}
      
      {/* ========== GOOGLE ANALYTICS (optional, use tag manager instead) [web:36] */}
      {/* 
      {import.meta.env.VITE_GOOGLE_ANALYTICS_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`}></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}');`}
          </script>
        </>
      )}
      */}
      
      {/* ========== FAVICON & SITE ICONS [web:36] */}
      <link rel="icon" type="image/png" href={`${siteUrl}/favicon-32x32.png`} sizes="32x32" />
      <link rel="icon" type="image/png" href={`${siteUrl}/favicon-16x16.png`} sizes="16x16" />
      <link rel="apple-touch-icon" href={`${siteUrl}/apple-touch-icon.png`} />
      
      {/* ========== PRECONNECT TO EXTERNAL RESOURCES (Performance) [web:36] */}
      <link rel="preconnect" href="https://archive.org" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://archive.org" />
      
      {/* ========== JSON-LD STRUCTURED DATA [web:36] */}
      {/* Multiple schemas support (Movie + BreadcrumbList, etc.) [web:36] */}
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
      
      {/* ========== CRITICAL: Alternative schema format for edge cases ========== */}
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
