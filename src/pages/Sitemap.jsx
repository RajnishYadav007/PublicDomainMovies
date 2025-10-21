import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Main Pages',
    links: [
      { to: '/', label: 'Home' },
      { to: '/browse', label: 'Browse' },
      { to: '/categories', label: 'Categories' },
      { to: '/about', label: 'About' }
    ]
  },
  {
    title: 'Popular Genres',
    links: [
      { to: '/category/genre/horror', label: 'Horror' },
      { to: '/category/genre/comedy', label: 'Comedy' },
      { to: '/category/genre/drama', label: 'Drama' },
      { to: '/category/genre/sci-fi', label: 'Sci-Fi' },
      { to: '/category/genre/western', label: 'Western' },
      { to: '/category/genre/film-noir', label: 'Film Noir' }
    ]
  },
  {
    title: 'Decades',
    links: [
      { to: '/category/decade/1890s', label: '1890s' },
      { to: '/category/decade/1920s', label: '1920s' },
      { to: '/category/decade/1930s', label: '1930s' },
      { to: '/category/decade/1940s', label: '1940s' },
      { to: '/category/decade/1950s', label: '1950s' },
      { to: '/category/decade/1960s', label: '1960s' }
    ]
  },
  {
    title: 'Important Links',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/dmca', label: 'DMCA Policy' },
      { to: '/faq', label: 'FAQ' },
      { to: '/search', label: 'Advanced Search' }
    ]
  }
];

const Sitemap = () => (
  <main
    className="bg-white dark:bg-gray-900 max-w-4xl mx-auto my-10 px-6 py-8 rounded-xl shadow-lg"
    aria-label="Archive Movies Sitemap"
  >
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Sitemap</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8">
      Quickly explore all important sections and browse classic public domain movies.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sections.map(section => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {section.title}
          </h2>
          <ul>
            {section.links.map(link => (
              <li key={link.to} className="mb-2">
                <Link
                  to={link.to}
                  className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </main>
);

export default Sitemap;
