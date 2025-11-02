// Based on Vite SSR prerender pattern [web:49][web:46]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// LEGAL REVIEW: Only prerender public-domain verified routes [web:17][web:21]
const routesToPrerender = [
  '/',
  '/about',
  '/browse',
  '/categories',
  '/privacy',
  '/terms',
  '/dmca',
  // Add /movie/:id routes only for verified public-domain items [web:17]
];

(async () => {
  for (const url of routesToPrerender) {
    const appHtml = await render(url);
    const html = template.replace(`<!--ssr-outlet-->`, appHtml);
    const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(toAbsolute(filePath), html);
  }
})();
