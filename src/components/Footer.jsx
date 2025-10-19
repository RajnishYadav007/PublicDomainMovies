import { Link } from 'react-router-dom';

/**
 * Main Footer Component
 * SEO-optimized with semantic HTML and structured links
 * Includes:
 * - Quick links
 * - Legal pages
 * - Social media
 * - Copyright info
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    browse: [
      { to: '/category/horror', label: 'Horror Movies' },
      { to: '/category/comedy', label: 'Comedy Movies' },
      { to: '/category/drama', label: 'Drama Movies' },
      { to: '/category/sci-fi', label: 'Sci-Fi Movies' }
    ],
    decades: [
      { to: '/decade/1920s', label: '1920s Films' },
      { to: '/decade/1930s', label: '1930s Films' },
      { to: '/decade/1940s', label: '1940s Films' },
      { to: '/decade/1950s', label: '1950s Films' }
    ],
    legal: [
      { to: '/about', label: 'About Us' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/dmca', label: 'DMCA Policy' }
    ]
  };

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: (
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/yourpage',
      icon: (
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@yourchannel',
      icon: (
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      )
    }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Archive Movies
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Watch classic public domain movies online free. Explore vintage films 
              from 1920s-1960s legally available from Internet Archive.
            </p>
            <Link 
              to="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Learn more →
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
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
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
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Legal & Info
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Email */}
            <div className="mt-4">
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Archive Movies. All rights reserved. 
              <span className="hidden md:inline"> | </span>
              <br className="md:hidden" />
              Content sourced from{' '}
              <a
                href="https://archive.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Internet Archive
              </a>
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-gray-500 dark:text-gray-500 text-xs text-center mt-6">
            Disclaimer: All movies on this site are public domain or openly licensed. 
            We do not host any content — all videos are embedded from Internet Archive.
          </p>
        </div>
      </div>
    </footer>
  );
}
