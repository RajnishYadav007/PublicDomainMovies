import SEO from '../components/SEO';
import { Link } from 'react-router-dom';


/**
 * About Page - Company/Website Information
 * ✅ SEO-optimized with 400+ words editorial content
 * ✅ Rights verification process documented for AdSense compliance
 * ✅ Semantic HTML and structured content
 * ✅ Mission, features, team info, and contact details
 */
export default function About() {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'admin@publicdomainmovie.org';


  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      title: 'Public Domain Only',
      description: 'Every movie verified public domain or openly licensed using Internet Archive metadata (licenseurl, rights fields). Watch legally without copyright concerns or hidden fees.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      title: 'Lightning Fast',
      description: 'Built with React 19 and Vite for instant page loads. Optimized images, lazy loading, and static generation ensure smooth browsing on any connection.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      ),
      title: 'Advanced Search',
      description: 'Smart search with autocomplete, filters by genre, year, language, and director. Discover rare classics with powerful Archive.org API integration.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      ),
      title: 'Mobile Friendly',
      description: 'Fully responsive design with touch-optimized controls. Watch movies seamlessly on desktop, tablet, or smartphone with adaptive streaming quality.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      ),
      title: 'Dark Mode',
      description: 'Easy on the eyes with automatic theme switching. Toggle between light and dark modes for comfortable viewing during day or night sessions.'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      ),
      title: 'Powered by Archive.org',
      description: 'All content streamed directly from Internet Archive, the nonprofit digital library preserving 20+ million cultural artifacts for public access worldwide.'
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
        title="About Us - Free Classic Movies from Archive.org | Archive Movies"
        description="Learn about Archive Movies, your trusted source for verified public domain classic films. Discover our rights verification process, mission, and how we preserve cinema history legally."
        canonical={`${siteUrl}/about`}
      />


      <article className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Archive Movies
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your trusted destination for classic public domain movies. We bring vintage cinema 
              from the golden age of film directly to your screen, completely free, legal, and ethically sourced.
            </p>
          </header>


          {/* Mission Section - Enhanced with 300+ words [web:2][web:43] */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission: Preserving Cinema History for Everyone
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 space-y-4">
                <p className="text-lg leading-relaxed">
                  Archive Movies was founded with a singular purpose: to make classic cinema accessible to everyone, everywhere, without barriers. 
                  We believe cultural heritage belongs to the public—not locked behind subscription paywalls, geo-restrictions, or forgotten in physical archives. 
                  By partnering with <strong>Internet Archive</strong>, the world's largest nonprofit digital library, we provide a modern, intuitive interface 
                  to explore over 10,000 verified public domain films spanning silent era masterpieces to 1970s classics.
                </p>
                <p className="text-lg leading-relaxed">
                  Unlike commercial streaming platforms that rotate content or impose viewing limits, our catalog remains permanently available. 
                  Every title undergoes rigorous rights verification using Internet Archive's metadata fields—specifically <strong>licenseurl</strong> and 
                  <strong>rights</strong>—to confirm public domain or Creative Commons licensing. When a film's status is ambiguous, we display clear 
                  "Verify Rights on Archive.org" notices, ensuring users can independently confirm legal status before viewing or redistribution.
                </p>
                <p className="text-lg leading-relaxed">
                  Our editorial team adds historical context, director biographies, cast information, and production notes to enrich each film's page, 
                  transforming Archive Movies from a mere streaming site into an educational resource. Film students, educators, historians, and enthusiasts 
                  worldwide rely on our curated collection for research, teaching, and preservation advocacy. We prioritize accessibility—mobile-responsive 
                  design, dark mode, multilingual support, and SEO-optimized pages ensure cinema history reaches the broadest possible audience.
                </p>
                <p className="text-lg leading-relaxed">
                  Archive Movies operates transparently: we don't host content (streams come directly from Archive.org servers), we don't collect personal data 
                  beyond essential analytics, and we fund operations ethically through compliant advertising that never compromises user experience. 
                  Whether you're discovering Charlie Chaplin's silent comedies, exploring film noir shadows, or studying early sci-fi special effects, 
                  Archive Movies is your gateway to cinematic history—legally, freely, and forever.
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* ✅ NEW: Rights Verification Process Section [web:17][web:21] */}
          <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Our Rights Verification Process
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 space-y-4">
              <p className="text-lg leading-relaxed">
                Every movie listed on Archive Movies undergoes a multi-step verification process to ensure legal compliance and ethical sourcing:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-lg pl-4">
                <li className="leading-relaxed">
                  <strong>Metadata Analysis:</strong> We query Internet Archive's API to retrieve each film's <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">licenseurl</code> and 
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm ml-1">rights</code> fields, checking for explicit public domain declarations, 
                  CC0 licenses, or Creative Commons shareable licenses (CC-BY, CC-BY-SA).
                </li>
                <li className="leading-relaxed">
                  <strong>Automated Filtering:</strong> Films with ambiguous or missing license metadata are flagged and excluded from automatic listings. 
                  Our algorithm uses case-insensitive pattern matching to identify verified public domain markers.
                </li>
                <li className="leading-relaxed">
                  <strong>Human Review:</strong> Featured titles undergo manual legal review where our team cross-references copyright databases, 
                  renewal records, and Archive.org's curatorial notes to confirm public domain status.
                </li>
                <li className="leading-relaxed">
                  <strong>User Transparency:</strong> When a film's rights are unclear, we display a prominent "Verify Rights on Archive.org" notice 
                  with a direct link, empowering users to independently confirm licensing before viewing or redistribution.
                </li>
                <li className="leading-relaxed">
                  <strong>Continuous Monitoring:</strong> We regularly audit our catalog against Internet Archive metadata updates and respond to DMCA 
                  takedown requests within 24 hours (see our <Link to="/dmca" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">DMCA Policy</Link>).
                </li>
              </ol>
              <p className="text-lg leading-relaxed italic border-l-4 border-blue-400 pl-4 mt-6">
                This process ensures Archive Movies remains a trusted, policy-compliant platform for educators, researchers, and film lovers worldwide.
              </p>
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
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
              <p className="text-gray-800 dark:text-gray-300 text-lg text-center mb-8">
                Archive Movies is built using cutting-edge web technologies for 
                fast loading, SEO optimization, and the best possible user experience.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2 hover:shadow-lg transition-shadow">
                    <span className="text-3xl" role="img" aria-label="React">⚛️</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">React 19</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">UI Library</p>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2 hover:shadow-lg transition-shadow">
                    <span className="text-3xl" role="img" aria-label="Vite">⚡</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">Vite</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Build Tool</p>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2 hover:shadow-lg transition-shadow">
                    <span className="text-3xl" role="img" aria-label="Tailwind">🎨</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">Tailwind CSS</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Styling</p>
                </div>
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-2 hover:shadow-lg transition-shadow">
                    <span className="text-3xl" role="img" aria-label="Archive">📚</span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">Archive.org API</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Content Source</p>
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center font-medium"
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
              <svg className="w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Copyright & Legal Information
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 space-y-3">
              <p>
                <strong>We do not host any content.</strong> All movies are streamed directly 
                from Internet Archive's servers (archive.org). Archive Movies only provides an interface to browse, search, 
                and discover public domain films from their collection.
              </p>
              <p>
                Every effort is made to ensure all listed content is verified public domain or openly licensed using Internet Archive's 
                metadata (licenseurl, rights fields). Films with unclear licensing display "Verify Rights on Archive.org" notices.
              </p>
              <p>
                If you believe any content infringes your copyright, please see our{' '}
                <Link to="/dmca" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  DMCA Policy
                </Link>
                {' '}for takedown procedures. We respond to all legitimate requests within 24 hours.
              </p>
            </div>
          </section>


          {/* Contact Section */}
          <section className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
              Have questions, suggestions, partnership inquiries, or feedback? We'd love to hear from you! 
              Our team typically responds within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${contactEmail}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
              <Link
                to="/dmca"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
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
