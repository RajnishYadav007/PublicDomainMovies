// utils/seoUtils.js

/**
 * SEO Utils for Classic/Archive Movies
 * - Meta tags generator
 * - JSON-LD Movie schema
 * - Page titles/descriptions
 * - Crawl directives
 *
 * Always: Only use for public domain or clearly shareable archive content!
 */

// Meta tag builder
export function buildMetaTags({ title, description, keywords, image, url }) {
  return [
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords || 'classic movies online, free archive movies, public domain movies, watch old movies' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image }
  ];
}

// Movie JSON-LD schema builder
export function buildMovieSchema({ identifier, title, description, year, creator, image, duration, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": title,
    "description": description,
    "datePublished": `${year || ''}`,
    "director": creator || "Unknown",
    "image": image,
    "duration": duration ? `PT${duration}M` : undefined,
    "url": url,
    "identifier": identifier,
    "isAccessibleForFree": true,
    "copyrightHolder": "Public Domain or Archive.org",  // ⚠️ Human legal review if unclear
    "publisher": "Internet Archive",
    "inLanguage": "English"
  };
}

// Simple canonical tag
export function getCanonical(url) {
  return url.replace(/(\?|#).*/, ''); // remove query/hash
}

// SEO Head helper (for Next.js Head or <Helmet>)
export function renderHeadTags(metaArr) {
  // Usage: metaArr = buildMetaTags(...)
  return metaArr.map((meta, i) => {
    if (meta.name) {
      return <meta key={i} name={meta.name} content={meta.content} />;
    }
    if (meta.property) {
      return <meta key={i} property={meta.property} content={meta.content} />;
    }
    return null;
  });
}
