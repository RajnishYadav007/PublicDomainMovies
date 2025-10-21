// scripts/generateSitemap.js

const fs = require('fs');
const path = require('path');

// Change these as per your deployment/domain
const BASE_URL = 'https://your-domain.com';

// ---- Static Sitewide URLs ----
const staticUrls = [
  '/',
  '/browse',
  '/categories',
  '/about',
  '/search',
  '/privacy',
  '/terms',
  '/dmca'
];

// ---- Category URLs ----
const categoryUrls = [
  '/category/genre/comedy',
  '/category/genre/horror',
  '/category/genre/drama',
  '/category/genre/film-noir',
  '/category/genre/western',
  '/category/genre/sci-fi',
  '/category/decade/1930s',
  '/category/decade/1940s',
  '/category/decade/1950s',
  '/category/language/english'
  // Add more as needed...
];

// ---- Load Movies List (Your JSON of archive.org movies) ----
// Must be an array: [{ identifier: "movie_id", ... }, ...]
const MOVIES_PATH = path.join(__dirname, '../public/movies-list.json');
const movies = fs.existsSync(MOVIES_PATH)
  ? JSON.parse(fs.readFileSync(MOVIES_PATH, 'utf-8'))
  : [];

function urlEntry(loc) {
  return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
}

// ---- Generate Sitemap ----
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static URLs
staticUrls.forEach(url => {
  sitemap += urlEntry(url) + '\n';
});

// Category URLs
categoryUrls.forEach(url => {
  sitemap += urlEntry(url) + '\n';
});

// Dynamic Movie Detail URLs
movies.forEach(movie => {
  if (movie.identifier) {
    sitemap += urlEntry(`/movie/${movie.identifier}`) + '\n';
  }
});

sitemap += '</urlset>\n';

// ---- Write to public/sitemap.xml ----
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(SITEMAP_PATH, sitemap);
console.log('✅ Sitemap generated at public/sitemap.xml');
