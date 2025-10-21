import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * DMCA / Copyright Takedown Page
 * ✅ REQUIRED for AdSense approval and legal compliance
 * ✅ Enhanced with structured data and comprehensive legal language
 * ✅ Mobile-responsive with clear visual hierarchy
 */
export default function DMCA() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://archive-movies.com';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'legal@archive-movies.com';
  const siteName = 'Archive Movies';

  return (
    <>
      {/* ✅ SEO Configuration with Structured Data */}
      <Helmet>
        <title>DMCA & Copyright Policy | {siteName}</title>
        <meta 
          name="description" 
          content="DMCA takedown procedure and copyright infringement policy for Archive Movies. Learn how to report copyright violations and file takedown notices." 
        />
        <meta name="keywords" content="DMCA policy, copyright takedown, copyright infringement, DMCA notice, intellectual property" />
        <link rel="canonical" href={`${siteUrl}/dmca`} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`DMCA & Copyright Policy | ${siteName}`} />
        <meta property="og:description" content="Copyright infringement and DMCA takedown procedure" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/dmca`} />
        
        {/* Structured Data - WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "DMCA & Copyright Policy",
            "description": "Copyright infringement and DMCA takedown procedure",
            "url": `${siteUrl}/dmca`,
            "isPartOf": {
              "@type": "WebSite",
              "name": siteName,
              "url": siteUrl
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": siteUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "DMCA Policy",
                  "item": `${siteUrl}/dmca`
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-gray-700 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2" aria-hidden="true">/</span>
                <span className="text-gray-900 dark:text-white font-medium">DMCA Policy</span>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              DMCA & Copyright Policy
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Digital Millennium Copyright Act Compliance and Copyright Infringement Reporting Procedures
            </p>
          </header>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
            
            {/* ✅ Important Notice Banner - AdSense Compliance */}
            <div className="not-prose bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 mb-8 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Important Copyright Notice
                  </h2>
                  <p className="text-blue-800 dark:text-blue-200 mb-0">
                    {siteName} respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). 
                    <strong className="block mt-2">We do NOT host any content.</strong> All movies are indexed from{' '}
                    <a 
                      href="https://archive.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-900 dark:hover:text-blue-100 font-medium text-blue-800 dark:text-blue-200"
                    >
                      Internet Archive
                    </a>
                    {' '}and filtered to include only public domain works.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Our Copyright Commitment */}
            <section id="commitment">
              <h2 className="text-gray-900 dark:text-white">Our Copyright Commitment</h2>
              <p>
                {siteName} is committed to respecting the intellectual property rights of others and complying with all applicable copyright laws, 
                including the Digital Millennium Copyright Act of 1998 (DMCA), 17 U.S.C. § 512.
              </p>
              <p>
                All content indexed on this website is sourced exclusively from{' '}
                <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                  Internet Archive (archive.org)
                </a>
                {' '}and filtered to include only:
              </p>
              <ul>
                <li><strong>Public domain works:</strong> Content with expired copyrights (typically pre-1928 in the United States)</li>
                <li><strong>Creative Commons CC0 licensed content:</strong> Works explicitly dedicated to the public domain by their creators</li>
                <li><strong>Open access collections:</strong> Content from verified public domain collections (Prelinger Archives, etc.)</li>
                <li><strong>Copyright-free material:</strong> Works explicitly marked as copyright-free by rights holders</li>
              </ul>
            </section>

            {/* Section 2: We Do Not Host Content */}
            <section id="no-hosting">
              <h2 className="text-gray-900 dark:text-white">We Do Not Host, Store, or Distribute Content</h2>
              <p>
                <strong>Critical Clarification:</strong> This website functions as an index and search interface for content hosted by Internet Archive. 
                We do NOT:
              </p>
              <ul>
                <li>Host video files on our servers</li>
                <li>Store movie files in any format</li>
                <li>Distribute or transmit copyrighted material</li>
                <li>Upload content to Internet Archive</li>
                <li>Control content availability on Internet Archive</li>
              </ul>
              <p>
                All video playback is embedded directly from Archive.org using their official embed code. Content availability, legality, 
                and licensing status are determined solely by Internet Archive's policies and their rights assessments.
              </p>
            </section>

            {/* Section 3: DMCA Takedown Procedure */}
            <section id="takedown-procedure">
              <h2 className="text-gray-900 dark:text-white">DMCA Takedown Procedure</h2>
              <p>
                If you believe that content linked on our website infringes your copyright, please follow this two-step process:
              </p>

              {/* Step 1: Contact Archive.org */}
              <div className="not-prose bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 my-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  File DMCA Notice with Internet Archive (Primary)
                </h3>
                <p className="text-gray-800 dark:text-gray-300 mb-4">
                  Since we do not host content, you <strong>must first</strong> file a DMCA takedown notice with Internet Archive, 
                  the actual content host:
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-yellow-300 dark:border-yellow-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Internet Archive DMCA Contact:</p>
                  <ul className="space-y-2 text-gray-800 dark:text-gray-300">
                    <li>
                      <strong>Email:</strong>{' '}
                      <a 
                        href="mailto:info@archive.org" 
                        className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
                      >
                        info@archive.org
                      </a>
                    </li>
                    <li>
                      <strong>DMCA Policy Page:</strong>{' '}
                      <a 
                        href="https://archive.org/about/dmca.php" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100 break-all"
                      >
                        archive.org/about/dmca.php
                      </a>
                    </li>
                    <li>
                      <strong>Physical Address:</strong><br />
                      Internet Archive<br />
                      ATTN: DMCA Agent<br />
                      300 Funston Avenue<br />
                      San Francisco, CA 94118
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2: Notify Us */}
              <div className="not-prose bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 my-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Notify Us (Optional - After Filing with Archive.org)
                </h3>
                <p className="text-gray-800 dark:text-gray-300 mb-4">
                  After filing your DMCA notice with Internet Archive, you may optionally notify us to remove the link from our index. 
                  Send your notice to:
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-md p-4 border border-gray-300 dark:border-gray-600">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">{siteName} Copyright Agent:</p>
                  <ul className="space-y-2 text-gray-800 dark:text-gray-300">
                    <li>
                      <strong>Email:</strong>{' '}
                      <a 
                        href={`mailto:${contactEmail}?subject=DMCA Takedown Notice`}
                        className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
                      >
                        {contactEmail}
                      </a>
                    </li>
                    <li>
                      <strong>Subject Line:</strong> "DMCA Takedown Notice - [Movie Title]"
                    </li>
                    <li>
                      <strong>Response Time:</strong> 48-72 business hours
                    </li>
                  </ul>
                </div>
              </div>

              {/* Required Elements */}
              <h3>Required Elements in Your DMCA Notice</h3>
              <p>
                Pursuant to 17 U.S.C. § 512(c)(3), your DMCA takedown notice must include the following information:
              </p>
              <ol>
                <li>
                  <strong>Physical or electronic signature:</strong> A signature of the copyright owner or person authorized to act on their behalf
                </li>
                <li>
                  <strong>Identification of copyrighted work:</strong> Clear identification of the work claimed to be infringed, 
                  or a representative list if multiple works are covered
                </li>
                <li>
                  <strong>Identification of infringing material:</strong> The specific URL(s) on {siteName} where the allegedly 
                  infringing content appears
                </li>
                <li>
                  <strong>Your contact information:</strong> Name, mailing address, telephone number, and email address
                </li>
                <li>
                  <strong>Good faith statement:</strong> A statement that you have a good faith belief that the disputed use is not 
                  authorized by the copyright owner, its agent, or the law
                </li>
                <li>
                  <strong>Accuracy statement:</strong> A statement, made under penalty of perjury, that the information in your notice 
                  is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf
                </li>
              </ol>

              {/* DMCA Template */}
              <div className="not-prose bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 my-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">DMCA Takedown Notice Template</h4>
                <pre className="bg-white dark:bg-gray-900 p-4 rounded-md border border-gray-300 dark:border-gray-600 overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
{`Subject: DMCA Takedown Notice - [Movie Title]

To: ${contactEmail}

I, [YOUR FULL NAME], hereby submit this DMCA takedown notice 
pursuant to 17 U.S.C. § 512(c)(3).

1. COPYRIGHTED WORK IDENTIFICATION:
   Title: [Original Work Title]
   Copyright Registration Number: [If registered]
   Original Location: [Your website URL]

2. INFRINGING MATERIAL LOCATION:
   ${siteUrl}/movie/[slug]
   
3. CONTACT INFORMATION:
   Name: [Your Full Name]
   Address: [Your Mailing Address]
   Phone: [Your Phone Number]
   Email: [Your Email]

4. GOOD FAITH STATEMENT:
   I have a good faith belief that the use of the material 
   described above is not authorized by the copyright owner, 
   its agent, or the law.

5. ACCURACY STATEMENT:
   I declare, under penalty of perjury, that the information 
   in this notification is accurate and that I am the copyright 
   owner or authorized to act on behalf of the copyright owner.

Signature: [Physical or Electronic Signature]
Date: [Current Date]`}
                </pre>
              </div>
            </section>

            {/* Section 4: Counter-Notification */}
            <section id="counter-notification">
              <h2 className="text-gray-900 dark:text-white">Counter-Notification Procedure</h2>
              <p>
                If you believe that content was removed or disabled as a result of mistake or misidentification, 
                you may submit a counter-notification under 17 U.S.C. § 512(g)(3) containing:
              </p>
              <ol>
                <li><strong>Your physical or electronic signature</strong></li>
                <li><strong>Identification of the removed content</strong> and its former location on our website</li>
                <li>
                  <strong>Statement under penalty of perjury</strong> that you have a good faith belief that the material 
                  was removed or disabled as a result of mistake or misidentification
                </li>
                <li><strong>Your name, address, telephone number, and email</strong></li>
                <li>
                  <strong>Consent to jurisdiction:</strong> A statement that you consent to the jurisdiction of the Federal 
                  District Court for the judicial district in which your address is located (or the Northern District of California 
                  if your address is outside the United States)
                </li>
                <li>
                  <strong>Acceptance of service:</strong> A statement that you will accept service of process from the person who 
                  filed the original DMCA notice or their agent
                </li>
              </ol>
              <p>
                Send counter-notifications to: <a href={`mailto:${contactEmail}`} className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">{contactEmail}</a>
              </p>
              <p>
                Upon receipt of a valid counter-notification, we will forward it to the original complainant. If they do not 
                file a court action seeking an injunction within 10-14 business days, we may restore the content at our discretion.
              </p>
            </section>

            {/* Section 5: Repeat Infringer Policy */}
            <section id="repeat-infringer">
              <h2 className="text-gray-900 dark:text-white">Repeat Infringer Policy</h2>
              <p>
                In accordance with the DMCA and other applicable laws, {siteName} has adopted a policy of terminating access 
                to our services for users who are deemed to be repeat infringers. A repeat infringer is defined as a user 
                who has been notified of infringing activity more than twice and/or has had content removed from our index 
                more than twice.
              </p>
              <p>
                We also reserve the right to terminate access for users who, in our sole discretion, are deemed to be repeat 
                infringers regardless of the number of notices received.
              </p>
            </section>

            {/* Section 6: Limitations and Liability */}
            <section id="limitations">
              <h2 className="text-gray-900 dark:text-white">Limitations and Liability Disclaimer</h2>
              <p>
                <strong>Service Provider Status:</strong> {siteName} qualifies as a service provider under 17 U.S.C. § 512(k)(1)(B) 
                and operates as an information location tool under § 512(d).
              </p>
              <p>
                <strong>No Duty to Monitor:</strong> We have no obligation to monitor content linked from our website or to actively 
                seek facts indicating infringing activity.
              </p>
              <p>
                <strong>Third-Party Content:</strong> We make no representations or warranties regarding the legality, accuracy, 
                or ownership status of content hosted on Internet Archive. Users access third-party content at their own risk.
              </p>
              <p>
                <strong>Liability Limitation:</strong> To the maximum extent permitted by law, {siteName} shall not be liable for 
                any claims, damages, or losses arising from copyright infringement by third parties or from our good faith removal 
                of content pursuant to DMCA notices.
              </p>
            </section>

            {/* Section 7: Misrepresentation Warning */}
            <section id="misrepresentation">
              <h2 className="text-gray-900 dark:text-white">Warning: Misrepresentation of Copyright Claims</h2>
              <div className="not-prose bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-6 my-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-red-900 dark:text-red-200 font-semibold mb-2">
                      Legal Consequences of False DMCA Claims
                    </p>
                    <p className="text-red-800 dark:text-red-300 text-sm">
                      Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material or activity 
                      is infringing may be subject to liability for damages, including costs and attorney's fees. Do not submit 
                      false or bad faith takedown notices.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Contact Information */}
            <section id="contact">
              <h2 className="text-gray-900 dark:text-white">Designated Copyright Agent Contact Information</h2>
              <div className="not-prose bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 my-6">
                <p className="text-gray-900 dark:text-white font-semibold mb-4">
                  {siteName} - Copyright Agent
                </p>
                <dl className="space-y-3 text-gray-800 dark:text-gray-300">
                  <div>
                    <dt className="font-semibold inline">Email:</dt>
                    <dd className="inline ml-2">
                      <a 
                        href={`mailto:${contactEmail}?subject=DMCA Notice`}
                        className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
                      >
                        {contactEmail}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Response Time:</dt>
                    <dd className="inline ml-2">48-72 business hours</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Office Hours:</dt>
                    <dd className="inline ml-2">Monday - Friday, 9:00 AM - 5:00 PM IST</dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Section 9: Additional Resources */}
            <section id="resources">
              <h2 className="text-gray-900 dark:text-white">Additional Copyright Resources</h2>
              <ul>
                <li>
                  <a href="https://www.copyright.gov/dmca/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    U.S. Copyright Office - DMCA Information
                  </a>
                </li>
                <li>
                  <a href="https://archive.org/about/dmca.php" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    Internet Archive DMCA Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.copyright.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    U.S. Copyright Office
                  </a>
                </li>
                <li>
                  <Link to="/about" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">About {siteName} - Public Domain Verification Process</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">Terms of Service</Link>
                </li>
              </ul>
            </section>

            {/* Footer Timestamp */}
            <footer className="not-prose mt-12 pt-6 border-t border-gray-300 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                <strong>Last Updated:</strong> October 19, 2025<br />
                <strong>Effective Date:</strong> October 19, 2025<br />
                <strong>Policy Version:</strong> 1.1
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-4">
                This DMCA policy is drafted in accordance with the Digital Millennium Copyright Act of 1998 (17 U.S.C. § 512) 
                and may be updated periodically to reflect changes in law or our procedures. Users are encouraged to review 
                this page regularly.
              </p>
            </footer>

          </article>
        </div>
      </div>
    </>
  );
}