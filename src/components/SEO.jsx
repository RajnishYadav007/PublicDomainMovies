import { Helmet } from 'react-helmet-async';

/**
 * Comprehensive SEO component with full meta tags and JSON-LD
 * Optimized for Google search and social sharing
 */
export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  schemaMarkup,
  type = 'website'
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const siteName = import.meta.env.VITE_SITE_NAME;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || import.meta.env.VITE_SITE_DESCRIPTION;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage || `${siteUrl}/og-default.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* ⚠️ HUMAN REVIEW: Add your Google verification code */}
      <meta name="google-site-verification" content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION} />
      
      {/* JSON-LD Structured Data */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
}
