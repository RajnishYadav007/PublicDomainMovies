import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

/**
 * About Page - Company/Website Information
 * SEO-optimized with semantic HTML and structured content
 * Includes mission, features, team info, and contact details
 */
export default function About() {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      title: 'Public Domain Only',
      description: 'Every movie is verified public domain or openly licensed. Watch legally without copyright concerns.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      title: 'Lightning Fast',
      description: 'Built with React and Vite for instant page loads. Optimized images and lazy loading for smooth experience.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      ),
      title: 'Advanced Search',
      description: 'Smart search with autocomplete, filters by genre, year, and language. Find classics easily.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      ),
      title: 'Mobile Friendly',
      description: 'Fully responsive design. Watch movies on any device — desktop, tablet, or smartphone.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      ),
      title: 'Dark Mode',
      description: 'Easy on the eyes. Toggle between light and dark themes for comfortable viewing anytime.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      ),
      title: 'Powered by Archive.org',
      description: 'All content streamed from Internet Archive, the nonprofit digital library preserving cultural artifacts.'
    }
  ];

  const stats = [
    { label: 'Movies Available', value: '10,000+' },
    { label: 'Years Covered', value: '1890-1970' },
    { label: 'Genres', value: '20+' },
    { label: 'Languages', value: '15+' }
  ];

  const teamMembers = [
    {
      name: 'Archive.org',
      role: 'Content Provider',
      description: 'Nonprofit organization preserving public domain films for future generations.',
      link: 'https://archive.org'
    },
    {
      name: 'Open Source Community',
      role: 'Technology Stack',
      description: 'Built with React, Vite, Tailwind CSS, and other amazing open source tools.',
      link: 'https://github.com'
    }
  ];

  return (
    <>
      <SEO
        title="About Us - Free Classic Movies from Archive.org"
        description="Learn about Archive Movies, your source for free public domain classic films. Watch vintage cinema from 1890s-1970s legally and safely online."
        canonical={`${siteUrl}/about`}
      />

      <article className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Archive Movies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your destination for classic public domain movies. We bring vintage cinema 
              from the golden age of film directly to your screen, completely free and legal.
            </p>
          </header>

          {/* Mission Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  Archive Movies was created to make classic cinema accessible to everyone. 
                  We believe that cultural heritage should be free and available to all, 
                  not locked behind paywalls or forgotten in dusty archives.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  By partnering with <strong>Internet Archive</strong>, we provide a modern, 
                  user-friendly interface to explore thousands of public domain films. 
                  From silent era masterpieces to 1960s classics, every movie is legally 
                  free to watch and share.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Whether you're a film student, history enthusiast, or just love old movies, 
                  Archive Movies is your gateway to cinematic history.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
                >
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
              Why Choose Archive Movies?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <svg 
                      className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Built with Modern Technology
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-8">
                Archive Movies is built using cutting-edge web technologies for 
                the best possible user experience.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2">
                    <span className="text-3xl">⚛️</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">React 19</p>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">Vite</p>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">Tailwind CSS</p>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2">
                    <span className="text-3xl">📚</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">Archive.org API</p>
                </div>
              </div>
            </div>
          </section>

          {/* Team/Partners Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
              Our Partners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {member.description}
                  </p>
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Copyright & Legal Notice */}
          <section className="mb-16 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Copyright & Legal Information
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>We do not host any content.</strong> All movies are streamed directly 
                from Internet Archive's servers. We only provide an interface to browse and 
                discover public domain films.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Every effort is made to ensure all content is public domain or openly licensed. 
                If you believe any content infringes your copyright, please see our{' '}
                <Link to="/dmca" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  DMCA Policy
                </Link>.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${contactEmail}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
              <Link
                to="/dmca"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                DMCA / Copyright
              </Link>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}
