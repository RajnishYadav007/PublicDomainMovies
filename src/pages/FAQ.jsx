import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import AdBanner from '../components/AdBanner';
import { generateFaqSchema } from '../utils/schemaGenerator';
import { useState } from 'react';


/**
 * FAQ Page - Frequently Asked Questions
 * ✅ 300+ words content for AdSense compliance [web:2][web:43]
 * ✅ Rich snippet schema for "People Also Ask" [web:36]
 * ✅ Accordion UI - Click to expand/collapse
 * ✅ Light mode: Questions VISIBLE
 * ✅ Dark mode: Questions VISIBLE
 * ✅ AdSense-compliant ad placement [web:2][web:22]
 */
export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "Are all movies on Archive Movies truly public domain?",
      answer: "Yes, every movie listed on our platform is verified as public domain or Creative Commons licensed. We filter content using Internet Archive's metadata fields (licenseurl and rights) to ensure legal status. However, we recommend users independently verify rights on Archive.org before redistribution or commercial use, as copyright laws vary by jurisdiction. Movies displaying 'Verify Rights on Archive.org' require manual confirmation before use."
    },
    {
      question: "What is public domain?",
      answer: "Public domain refers to creative works that are not protected by copyright and are freely available for anyone to use, modify, and distribute. This typically includes films published before 1928 in the United States, works where copyright has expired, and content explicitly released into the public domain by creators. Public domain films represent cultural heritage accessible to educators, historians, and the general public."
    },
    {
      question: "Can I download movies and watch offline?",
      answer: "Yes! All movies on Archive Movies can be accessed directly from Internet Archive. You can stream online through our player or download files in multiple formats (MP4, WebM, Ogg) from the Archive.org detail page for offline viewing. Since these are public domain films, you can keep personal copies indefinitely. Simply click 'Verify Rights on Archive.org' or the Archive.org link on any movie page to access download options."
    },
    {
      question: "Can I use these movies for educational or commercial purposes?",
      answer: "Public domain films are generally free to use for most purposes, including educational and commercial projects, without permission or licensing fees. However, rights status can be complex, especially for films with unclear provenance. Before using a public domain film commercially (in films, broadcasts, or derivative works), verify its specific license on Archive.org. Some jurisdictions have different public domain rules, so always confirm local copyright laws apply to your use case."
    },
    {
      question: "Why are some movies labeled 'Verify Rights on Archive.org'?",
      answer: "We use automated metadata verification from Internet Archive to classify films as public domain. If a movie's license status is ambiguous or unclear in the metadata, we display a 'Verify Rights on Archive.org' notice requiring manual verification before viewing or using the content. This conservative approach protects users and ensures compliance with copyright laws. You can always check the film's detailed record on Archive.org to confirm its legal status."
    },
    {
      question: "Is it legal to watch movies on Archive Movies?",
      answer: "Yes, watching public domain films on Archive Movies is completely legal. All content is sourced from Internet Archive, a reputable nonprofit digital library, and has been verified as public domain or openly licensed. We operate transparently with clear rights notices and DMCA policies. If you have concerns about specific content rights, our DMCA policy page explains our process for addressing copyright questions. Feel free to contact us with any concerns."
    },
    {
      question: "What's the difference between public domain and Creative Commons licensed?",
      answer: "Public domain works have no copyright restrictions and are free to use for any purpose. Creative Commons licensed works retain some copyright but allow specific uses under their chosen license terms. For example, CC-BY requires attribution, CC-BY-SA requires sharing alike, and CC-BY-NC restricts commercial use. Archive Movies includes both public domain and openly licensed Creative Commons films. Always check the specific license on each film's page to understand permitted uses."
    },
    {
      question: "Why do I need to verify rights before downloading or sharing?",
      answer: "While all films on Archive Movies are marked as public domain or licensed, copyright law is complex and varies by country. Some films may have unclear histories, restoration credits, or regional restrictions. Verifying on Archive.org ensures you have the most current rights information before redistributing or using content commercially. This protects you legally and supports proper attribution of filmmakers and archivists who worked to preserve cinema history."
    },
    {
      question: "How often are new movies added to Archive Movies?",
      answer: "Archive Movies catalogs films from Internet Archive's collection, which constantly grows with new digital acquisitions, restorations, and community contributions. We periodically sync with Archive.org to surface newly added public domain films. Follow our social media or check back regularly for latest additions. You can also browse by date added or popularity to discover recent additions. If you'd like a specific film added, contact us or suggest it to Internet Archive directly."
    },
    {
      question: "What quality are the video streams?",
      answer: "Video quality varies depending on the film's source material and restoration. Archive.org offers multiple formats and bitrates for most films, from low-bandwidth options to high-definition restorations. Older silent films may have lower native resolution due to original film stock limitations. You can preview quality on Archive.org before committing. For highest quality, check the 'Download Options' section on each movie's detail page to access the best available format."
    },
    {
      question: "Can I embed Archive Movies videos on my website?",
      answer: "Archive Movies is a discovery and streaming interface; we don't host video files. Instead, you can embed directly from Internet Archive using their embed code, which is available on each film's Archive.org detail page. Simply use the 'Embed' feature on Archive.org to get an iframe for your website. This respects bandwidth and ensures you link to authoritative sources. Always verify the film's public domain status and attribution requirements before embedding."
    },
    {
      question: "Is there a privacy policy and what data do you collect?",
      answer: "Yes, see our Privacy Policy for details on data practices. Archive Movies does not require registration or account creation. We use minimal analytics to improve the service but do not sell user data. Any personal information collected is handled according to privacy regulations. We're transparent about third-party integrations (Archive.org API, Google). If you have privacy concerns or requests, contact us at the email provided on our Contact page."
    }
  ];

  const faqSchema = generateFaqSchema(faqs);

  const totalWords = faqs.reduce((sum, faq) => {
    const q = faq.question.split(/\s+/).length;
    const a = faq.answer.split(/\s+/).length;
    return sum + q + a;
  }, 0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions"
        description="Common questions about public domain movies, copyright, downloading, and using classic films from Archive Movies."
        canonical="/faq"
        schemaMarkup={faqSchema}
      />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Learn about public domain movies, copyright, streaming, and how to legally use classic films from Archive Movies.
            </p>
          </header>

          {/* Ad Banner (top) */}
          <div className="mb-8">
            <AdBanner slot="faq-top" format="horizontal" minWords={300} />
          </div>

          {/* FAQ List - ✅ FIXED FOR LIGHT MODE */}
          <section className="max-w-4xl mx-auto mb-12" aria-labelledby="faq-heading">
            <div id="faq-heading" className="sr-only">
              Frequently Asked Questions about Public Domain Movies
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all"
                >
                  {/* Question (Accordion Header) - ✅ VISIBLE IN LIGHT MODE */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between 
                             bg-gray-100 dark:bg-gray-800 
                             hover:bg-gray-150 dark:hover:bg-gray-750
                             transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-expanded={expandedIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-200 ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>

                  {/* Answer (Accordion Content) - ✅ SHOWS ON CLICK */}
                  {expandedIndex === index && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700"
                    >
                      <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Ad Banner (middle) */}
          {totalWords >= 300 && (
            <div className="mb-12">
              <AdBanner slot="faq-mid" format="horizontal" minWords={300} />
            </div>
          )}

          {/* Contact CTA - ✅ LIGHT MODE FIXED */}
          <section className="max-w-4xl mx-auto bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-lg p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Didn't find your answer?
            </h2>
            <p className="text-gray-800 dark:text-gray-300 mb-6">
              Have questions about public domain content, rights, or our service? Contact us for more information.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:admin@publicdomainmovie.org"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
              <a
                href="/dmca"
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                DMCA Policy
              </a>
            </div>
          </section>

          {/* Additional Info - ✅ LIGHT MODE FIXED */}
          <section className="max-w-4xl mx-auto bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg p-6 mb-12">
            <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-3">
              ℹ️ Resources for Learning More
            </h3>
            <ul className="text-sm text-yellow-900 dark:text-yellow-200 space-y-2">
              <li>
                📚 <strong>Internet Archive:</strong>{' '}
                <a 
                  href="https://archive.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Visit archive.org
                </a>
                {' '} for comprehensive film collection and metadata
              </li>
              <li>
                ⚖️ <strong>U.S. Copyright Office:</strong>{' '}
                <a 
                  href="https://www.copyright.gov/help/faq/faq-duration.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Public Domain Information
                </a>
              </li>
              <li>
                🔗 <strong>Creative Commons:</strong>{' '}
                <a 
                  href="https://creativecommons.org/about/cclicenses/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  License Information
                </a>
              </li>
            </ul>
          </section>

          {/* Ad Banner (bottom) */}
          {totalWords >= 300 && (
            <div className="mt-12">
              <AdBanner slot="faq-bottom" format="horizontal" minWords={300} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
