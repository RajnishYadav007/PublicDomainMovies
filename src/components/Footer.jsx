import { Link } from 'react-router-dom';

/**
 * Main Footer Component
 * ✅ SEO-optimized with semantic HTML and structured links
 * ✅ Responsive design (mobile-first)
 * ✅ Dark mode support
 * ✅ Social media integration
 * ✅ Back to top button with smooth scroll
 * 
 * Includes:
 * - Quick links navigation
 * - Legal pages (Privacy, DMCA, Terms)
 * - Social media links
 * - Copyright info & disclaimer
 * - Sitemap link
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://publicdomainmovie.vercel.app';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'admin@publicdomainmovie.org';
  const siteName = import.meta.env.VITE_SITE_NAME || 'Archive Movies';

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = {
    browse: [
      { to: '/category/genre/horror', label: 'Horror Movies' },
      { to: '/category/genre/comedy', label: 'Comedy Movies' },
      { to: '/category/genre/drama', label: 'Drama Movies' },
      { to: '/category/genre/sci-fi', label: 'Sci-Fi Movies' },
      { to: '/category/genre/western', label: 'Western Movies' },
      { to: '/category/genre/film-noir', label: 'Film Noir' }
    ],
    decades: [
      { to: '/category/decade/1890s', label: '1890s Films' },
      { to: '/category/decade/1920s', label: '1920s Films' },
      { to: '/category/decade/1930s', label: '1930s Films' },
      { to: '/category/decade/1940s', label: '1940s Films' },
      { to: '/category/decade/1950s', label: '1950s Films' },
      { to: '/category/decade/1960s', label: '1960s Films' }
    ],
    legal: [
      { to: '/about', label: 'About Us' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/dmca', label: 'DMCA Policy' },
      { to: '/faq', label: 'FAQ' }
    ],
    resources: [
      { to: '/categories', label: 'All Categories' },
      { to: '/browse', label: 'Browse Movies' },
      { to: '/search', label: 'Search' },
      { href: 'https://archive.org', label: 'Internet Archive', external: true }
    ]
  };

  const socialLinks = [
    {
      name: 'Twitter',
      url: import.meta.env.VITE_TWITTER_URL || '#',
      icon: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      )
    },
    {
      name: 'Facebook',
      url: import.meta.env.VITE_FACEBOOK_URL || '#',
      icon: (
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      )
    },
    {
      name: 'YouTube',
      url: import.meta.env.VITE_YOUTUBE_URL || '#',
      icon: (
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      )
    },
    {
      name: 'GitHub',
      url: import.meta.env.VITE_GITHUB_URL || 'https://github.com/RajnishYadav007/Archive02',
      icon: (
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      )
    }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* About Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg 
                className="w-8 h-8 text-blue-600 dark:text-blue-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {siteName}
              </span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Watch classic public domain movies online free. Explore vintage films 
              from 1890s-1970s legally available from Internet Archive.
            </p>
            
            <Link 
              to="/about"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Browse Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Browse Movies
            </h3>
            <ul className="space-y-2">
              {footerLinks.browse.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                             text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Decades Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              By Decade
            </h3>
            <ul className="space-y-2">
              {footerLinks.decades.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                             text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Legal & Info
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                             text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map(link => (
                <li key={link.to || link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                               text-sm transition-colors inline-flex items-center gap-1
                               focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    >
                      {link.label}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                               text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Contact Email */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <a
                href={`mailto:${contactEmail}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center gap-1
                         focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {currentYear} {siteName}. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Content sourced from{' '}
                <a
                  href="https://archive.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Internet Archive
                </a>
                {' '}• Public Domain Films
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                Follow us:
              </span>
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                           transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
                  aria-label={`Follow us on ${social.name}`}
                  title={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-500 text-xs text-center leading-relaxed">
              <strong>Disclaimer:</strong> All movies on this site are public domain or openly licensed. 
              We do not host any content — all videos are embedded from Internet Archive. 
              Users should independently verify copyright status before redistribution.
            </p>
          </div>

          {/* Back to Top Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 
                       hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-4 py-2"
              aria-label="Scroll back to top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
