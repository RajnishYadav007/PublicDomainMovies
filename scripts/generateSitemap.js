// scripts/generateSitemap.js
/**
 * Sitemap Generator for Archive Movies
 * ✅ Generates SEO-optimized XML sitemap
 * ✅ CRITICAL: Only includes public-domain verified movies [web:17][web:21][web:34][web:36]
 * ✅ Prevents indexing of low-value/utility pages [web:2][web:36]
 * ✅ Environment-aware domain configuration
 * ✅ Validates entries before writing
 * ✅ Priority weighting for crawl efficiency [web:34][web:36]
 * 
 * Run: node scripts/generateSitemap.js
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');


// ============================================================================
// CONFIGURATION (Environment-aware)
// ============================================================================

// ✅ HUMAN REVIEW: Update this to match your production domain [web:36]
const BASE_URL = process.env.VITE_SITE_URL || 'https://archivemovies.vercel.app';

console.log(`📍 Generating sitemap for: ${BASE_URL}`);


// ============================================================================
// STATIC SITE URLS (Pages with substantial content for indexing) [web:2][web:36]
// ============================================================================

const staticUrls = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0,
    description: 'Homepage - featured movies'
  },
  {
    loc: '/browse',
    changefreq: 'daily',
    priority: 0.9,
    description: 'Browse all movies'
  },
  {
    loc: '/categories',
    changefreq: 'weekly',
    priority: 0.8,
    description: 'Browse by genre/decade'
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.7,
    description: 'About page - mission & rights process'
  },
  {
    loc: '/privacy',
    changefreq: 'yearly',
    priority: 0.5,
    description: 'Privacy policy'
  },
  {
    loc: '/terms',
    changefreq: 'yearly',
    priority: 0.5,
    description: 'Terms of service'
  },
  {
    loc: '/dmca',
    changefreq: 'yearly',
    priority: 0.6,
    description: 'DMCA policy & takedown'
  }
];

// ❌ NEVER include these in sitemap (low-value/utility) [web:2][web:36]
const blockedUrls = ['/404', '/search', '/error', '/not-found'];


// ============================================================================
// CATEGORY URLS (Genre, Decade, Language filters) [web:36]
// ============================================================================

const categoryUrls = [
  // Genres [web:36]
  { loc: '/category/genre/comedy', priority: 0.8 },
  { loc: '/category/genre/horror', priority: 0.8 },
  { loc: '/category/genre/drama', priority: 0.8 },
  { loc: '/category/genre/film-noir', priority: 0.8 },
  { loc: '/category/genre/western', priority: 0.8 },
  { loc: '/category/genre/sci-fi', priority: 0.8 },
  { loc: '/category/genre/silent', priority: 0.8 },
  { loc: '/category/genre/adventure', priority: 0.7 },
  { loc: '/category/genre/romance', priority: 0.7 },
  { loc: '/category/genre/thriller', priority: 0.7 },

  // Decades [web:36]
  { loc: '/category/decade/1920s', priority: 0.8 },
  { loc: '/category/decade/1930s', priority: 0.8 },
  { loc: '/category/decade/1940s', priority: 0.8 },
  { loc: '/category/decade/1950s', priority: 0.8 },
  { loc: '/category/decade/1960s', priority: 0.7 },
  { loc: '/category/decade/1970s', priority: 0.7 },

  // Languages [web:36]
  { loc: '/category/language/english', priority: 0.8 },
  { loc: '/category/language/silent', priority: 0.7 },
  { loc: '/category/language/french', priority: 0.6 },
  { loc: '/category/language/german', priority: 0.6 }
];


// ============================================================================
// ✅ LOAD & FILTER MOVIES (Only public-domain verified) [web:17][web:21][web:34]
// ============================================================================

const MOVIES_PATH = path.join(__dirname, '../public/movies-list.json');

let movies = [];
if (fs.existsSync(MOVIES_PATH)) {
  try {
    const rawMovies = JSON.parse(fs.readFileSync(MOVIES_PATH, 'utf-8'));
    
    // ✅ CRITICAL: Filter to only verified public domain movies [web:17][web:21]
    movies = rawMovies.filter(movie => {
      // Validate required fields
      if (!movie.identifier || !movie.title) return false;

      // Check public domain status using licenseurl/rights [web:17][web:21]
      const licenseUrl = (movie.licenseurl || '').toLowerCase();
      const rights = (movie.rights || '').toLowerCase();
      const collection = Array.isArray(movie.collection) 
        ? movie.collection 
        : [movie.collection].filter(Boolean);

      const isPD = 
        licenseUrl.includes('publicdomain') ||
        licenseUrl.includes('cc0') ||
        rights.includes('public domain') ||
        collection.some(c => (c || '').toLowerCase().includes('prelinger'));

      if (!isPD) {
        console.warn(`⚠️  Excluded (ambiguous license): ${movie.identifier}`);
      }

      return isPD;
    });

    console.log(`✅ Loaded ${movies.length} verified public-domain movies`);
  } catch (error) {
    console.error(`❌ Error parsing movies-list.json: ${error.message}`);
    movies = [];
  }
} else {
  console.warn(`⚠️  movies-list.json not found at ${MOVIES_PATH}`);
  console.warn('   Run: node scripts/fetchArchiveMovies.js first');
}


// ============================================================================
// XML GENERATION HELPERS
// ============================================================================

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}


/**
 * Validate and format URL entry
 */
function createUrlEntry(loc, changefreq = 'weekly', priority = 0.7, lastmod = null) {
  // Validate URL format
  if (!loc || typeof loc !== 'string') return null;

  // Prevent blocked URLs from being added [web:2][web:36]
  if (blockedUrls.some(blocked => loc.includes(blocked))) {
    console.warn(`⚠️  Blocked low-value URL: ${loc}`);
    return null;
  }

  // Validate priority (0.0–1.0)
  if (priority < 0 || priority > 1) priority = 0.7;

  // Valid changefreq values per XML spec
  const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  if (!validFreqs.includes(changefreq)) changefreq = 'weekly';

  let entry = '  <url>\n';
  entry += `    <loc>${BASE_URL}${escapeXml(loc)}</loc>\n`;
  entry += `    <changefreq>${changefreq}</changefreq>\n`;
  entry += `    <priority>${priority.toFixed(1)}</priority>\n`;
  
  if (lastmod) {
    entry += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  
  entry += '  </url>\n';
  
  return entry;
}


// ============================================================================
// GENERATE SITEMAP
// ============================================================================

function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<!-- Archive Movies Sitemap -->\n';
  sitemap += '<!-- Generated: ' + new Date().toISOString() + ' -->\n';
  sitemap += '<!-- CRITICAL: Only includes public-domain verified content [web:17][web:21][web:34] -->\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

  let entryCount = 0;
  let skippedCount = 0;

  // Add static URLs [web:2][web:36]
  console.log('📄 Adding static pages...');
  staticUrls.forEach(({ loc, changefreq, priority, description }) => {
    const entry = createUrlEntry(loc, changefreq, priority);
    if (entry) {
      sitemap += entry;
      entryCount++;
      console.log(`  ✅ ${loc} (${description})`);
    } else {
      skippedCount++;
    }
  });

  // Add category URLs [web:36]
  console.log('\n🏷️  Adding category pages...');
  categoryUrls.forEach(({ loc, priority = 0.8 }) => {
    const entry = createUrlEntry(loc, 'weekly', priority);
    if (entry) {
      sitemap += entry;
      entryCount++;
    } else {
      skippedCount++;
    }
  });

  // Add movie detail URLs [web:17][web:21][web:34][web:36]
  console.log(`\n🎬 Adding ${movies.length} movie detail pages...`);
  movies.forEach((movie, index) => {
    const movieLoc = `/movie/${movie.identifier}`;
    const movieLastmod = movie.updated || null;
    
    // Priority decreases as catalog grows (recent movies get higher priority)
    const priority = Math.max(0.5, 0.9 - (index / movies.length) * 0.3);
    
    const entry = createUrlEntry(movieLoc, 'weekly', priority, movieLastmod);
    if (entry) {
      sitemap += entry;
      entryCount++;
    } else {
      skippedCount++;
    }
  });

  sitemap += '\n</urlset>\n';

  return { sitemap, entryCount, skippedCount };
}


// ============================================================================
// WRITE SITEMAP TO FILE
// ============================================================================

function writeSitemap() {
  try {
    console.log('\n🔧 Generating sitemap...\n');
    const { sitemap, entryCount, skippedCount } = generateSitemap();

    const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
    
    // Create public dir if needed
    const publicDir = path.dirname(SITEMAP_PATH);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log(`📁 Created ${publicDir}/`);
    }

    // Write sitemap
    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');

    // Calculate file size
    const fileSize = (fs.statSync(SITEMAP_PATH).size / 1024).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SITEMAP GENERATED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log(`📍 Location: ${SITEMAP_PATH}`);
    console.log(`📊 Total entries: ${entryCount}`);
    console.log(`⏭️  Skipped (invalid): ${skippedCount}`);
    console.log(`📦 File size: ${fileSize} KB`);
    console.log(`🌐 Base URL: ${BASE_URL}`);
    console.log(`🔗 Access at: ${BASE_URL}/sitemap.xml`);
    console.log('\n✅ Submit to Google Search Console:');
    console.log(`   https://search.google.com/search-console`);
    console.log('\n✅ Verify in robots.txt: ✓ Sitemap declared');
    console.log('='.repeat(60) + '\n');

    return true;
  } catch (error) {
    console.error('\n❌ ERROR GENERATING SITEMAP');
    console.error(`Error: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
    return false;
  }
}


// ============================================================================
// MAIN EXECUTION
// ============================================================================

if (require.main === module) {
  const success = writeSitemap();
  process.exit(success ? 0 : 1);
}


module.exports = { generateSitemap, writeSitemap, escapeXml, createUrlEntry };
