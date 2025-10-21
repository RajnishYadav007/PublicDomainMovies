import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Privacy Policy Page
 * ✅ REQUIRED for AdSense approval (updated Feb 2025 policies)
 * ✅ GDPR, CCPA/CPRA, and state privacy laws compliant
 * ✅ Google consent management requirements met
 * 
 * ⚠️ HUMAN REVIEW REQUIRED: Customize sections marked with ⚠️
 */
export default function Privacy() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://archive-movies.com';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'privacy@archive-movies.com';
  const siteName = 'Archive Movies';
  const lastUpdated = 'October 19, 2025';
  const effectiveDate = 'October 19, 2025';

  return (
    <>
      {/* ✅ SEO Configuration */}
      <Helmet>
        <title>Privacy Policy | {siteName}</title>
        <meta 
          name="description" 
          content="Privacy Policy for Archive Movies. Learn how we collect, use, and protect your data. GDPR, CCPA compliant. Information about cookies, Google AdSense, and your privacy rights." 
        />
        <meta name="keywords" content="privacy policy, data protection, GDPR, CCPA, cookies, Google AdSense privacy" />
        <link rel="canonical" href={`${siteUrl}/privacy`} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`Privacy Policy | ${siteName}`} />
        <meta property="og:description" content="Our commitment to protecting your privacy and data" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/privacy`} />
        
        {/* Structured Data - WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Privacy Policy and data protection practices",
            "url": `${siteUrl}/privacy`,
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
                  "name": "Privacy Policy",
                  "item": `${siteUrl}/privacy`
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
                <span className="text-gray-900 dark:text-white font-medium">Privacy Policy</span>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-gray-700 dark:text-gray-300">
              <div>
                <strong>Last Updated:</strong> {lastUpdated}
              </div>
              <div className="hidden sm:block">|</div>
              <div>
                <strong>Effective Date:</strong> {effectiveDate}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
            
            {/* Introduction */}
            <section id="introduction">
              <div className="not-prose bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 mb-8 rounded-r-lg">
                <h2 className="text-xl font-bold text-blue-900 dark:text-blue-50 mb-3">
                  Your Privacy Matters
                </h2>
                <p className="text-blue-800 dark:text-blue-100">
                  {siteName} is committed to protecting your privacy and being transparent about how we collect, use, 
                  and share your information. This Privacy Policy explains our data practices in compliance with GDPR, 
                  CCPA/CPRA, and other applicable privacy laws.
                </p>
              </div>

              <p>
                This Privacy Policy applies to {siteName} ("{siteName}", "we", "us", or "our") and describes how 
                we handle information when you visit our website at{' '}
                <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">{siteUrl}</a> (the "Site").
              </p>
              <p>
                By using our Site, you consent to the data practices described in this policy. If you do not agree 
                with this Privacy Policy, please do not use our Site.
              </p>
            </section>

            {/* Section 1: Information We Collect */}
            <section id="information-collection">
              <h2 className="text-gray-900 dark:text-white">1. Information We Collect</h2>
              
              <h3>1.1 Information You Provide Voluntarily</h3>
              <p>
                We collect minimal personal information. Currently, we do NOT require account registration or collect:
              </p>
              <ul>
                <li>Names or email addresses (unless you contact us)</li>
                <li>Payment information (our service is free)</li>
                <li>User-generated content or profiles</li>
              </ul>
              <p>
                <strong>Contact Forms:</strong> If you contact us via email at{' '}
                <a href={`mailto:${contactEmail}`} className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">{contactEmail}</a>, we collect your email address and any 
                information you choose to provide in your message.
              </p>

              <h3>1.2 Information Collected Automatically</h3>
              <p>
                When you visit our Site, we automatically collect certain technical information through cookies 
                and similar technologies:
              </p>
              <ul>
                <li><strong>Device Information:</strong> Browser type and version, operating system, device type</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, search queries</li>
                <li><strong>Location Data:</strong> Approximate geographic location based on IP address (city/country level)</li>
                <li><strong>Referral Information:</strong> Referring website or search engine</li>
                <li><strong>Technical Data:</strong> IP address, screen resolution, language preferences</li>
              </ul>
            </section>

            {/* Section 2: Cookies and Tracking Technologies */}
            <section id="cookies">
              <h2 className="text-gray-900 dark:text-white">2. Cookies and Tracking Technologies</h2>
              
              <p>
                We use cookies (small text files stored on your device) and similar tracking technologies to improve 
                your experience and serve relevant advertisements.
              </p>

              <h3>2.1 Types of Cookies We Use</h3>
              
              <div className="not-prose overflow-x-auto my-6">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b">Cookie Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b">Purpose</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b">Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200"><strong>Essential</strong></td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">Required for site functionality (dark mode, language preferences)</td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200"><strong>Analytics</strong></td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">Google Analytics - understand usage patterns and improve services</td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">No (opt-out available)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200"><strong>Advertising</strong></td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">Google AdSense - deliver relevant ads and measure ad effectiveness</td>
                      <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">No (opt-out available)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>2.2 Managing Cookies</h3>
              <p>
                You can control cookies through your browser settings. However, disabling essential cookies may affect 
                site functionality. To manage cookies:
              </p>
              <ul>
                <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies via settings</li>
                <li><strong>Opt-Out Tools:</strong> Use browser extensions like uBlock Origin or Privacy Badger</li>
                <li><strong>Google Ads Settings:</strong> Manage personalized ads at{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    google.com/settings/ads
                  </a>
                </li>
              </ul>
            </section>

            {/* Section 3: Third-Party Services */}
            <section id="third-party">
              <h2 className="text-gray-900 dark:text-white">3. Third-Party Services and Data Sharing</h2>
              
              <p>
                We use third-party services to operate our Site and serve advertisements. These services may collect 
                and process your data according to their own privacy policies.
              </p>

              <h3>3.1 Google AdSense (Advertising)</h3>
              <div className="not-prose bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 my-6">
                <h4 className="text-lg font-bold text-yellow-900 dark:text-yellow-50 mb-3">
                  Important AdSense Privacy Notice (Updated February 2025)
                </h4>
                <p className="text-yellow-800 dark:text-yellow-100 text-sm leading-relaxed">
                  We use Google AdSense to display advertisements on our Site. Google uses cookies, web beacons, 
                  and other tracking technologies to collect information about your visits to this and other websites 
                  to provide relevant advertisements about goods and services.
                </p>
                <p className="text-yellow-800 dark:text-yellow-100 text-sm leading-relaxed mt-3">
                  <strong>Data Collected by Google:</strong> Device identifiers, IP address, browsing history, 
                  location data, ad interaction data, and demographic information.
                </p>
                <p className="text-yellow-800 dark:text-yellow-100 text-sm leading-relaxed mt-3">
                  <strong>Privacy-Enhancing Technologies:</strong> Google may use on-device processing, Trusted Execution 
                  Environments, and secure multi-party computation to protect your privacy while serving ads.
                </p>
              </div>

              <p>
                <strong>How to Opt Out of Personalized Ads:</strong>
              </p>
              <ul>
                <li>
                  Visit{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    Google Ads Settings
                  </a>{' '}
                  to disable personalized advertising
                </li>
                <li>
                  Use the{' '}
                  <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    Network Advertising Initiative (NAI) opt-out tool
                  </a>
                </li>
                <li>
                  Enable{' '}
                  <a href="https://globalprivacycontrol.org/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    Global Privacy Control (GPC)
                  </a>{' '}
                  in your browser
                </li>
              </ul>

              <p>
                <strong>Google Privacy Policy:</strong>{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                  policies.google.com/privacy
                </a>
              </p>

              <h3>3.2 Google Analytics</h3>
              <p>
                We use Google Analytics to analyze Site usage and improve user experience. Google Analytics collects 
                data such as:
              </p>
              <ul>
                <li>Pages viewed and time spent</li>
                <li>Geographic location (city/country level)</li>
                <li>Device and browser information</li>
                <li>Traffic sources and referral paths</li>
              </ul>
              <p>
                <strong>Opt-Out:</strong> Install the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                  Google Analytics Opt-out Browser Add-on
                </a>
              </p>

              <h3>3.3 Internet Archive (archive.org)</h3>
              <p>
                Movie content is embedded directly from Internet Archive. When you play videos, Archive.org may collect 
                information according to their{' '}
                <a href="https://archive.org/about/terms.php" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                  Privacy Policy and Terms of Service
                </a>.
              </p>
              <p>
                <strong>We do not control Archive.org's data practices.</strong> Please review their privacy policy 
                for information about how they handle your data.
              </p>

              <h3>3.4 Data We Do NOT Share</h3>
              <p>
                We do NOT:
              </p>
              <ul>
                <li>Sell your personal information to third parties</li>
                <li>Share your data with data brokers or marketing companies</li>
                <li>Use your data for purposes other than those disclosed in this policy</li>
              </ul>
            </section>

            {/* Section 4: How We Use Your Information */}
            <section id="how-we-use">
              <h2 className="text-gray-900 dark:text-white">4. How We Use Your Information</h2>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul>
                <li><strong>Site Operation:</strong> Provide, maintain, and improve our services</li>
                <li><strong>User Experience:</strong> Remember your preferences (dark mode, language settings)</li>
                <li><strong>Analytics:</strong> Understand how users interact with our Site and identify areas for improvement</li>
                <li><strong>Advertising:</strong> Display relevant ads and measure ad performance</li>
                <li><strong>Communication:</strong> Respond to inquiries and support requests</li>
                <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
                <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
              </ul>
            </section>

            {/* Section 5: Data Storage and Security */}
            <section id="data-storage">
              <h2 className="text-gray-900 dark:text-white">5. Data Storage and Security</h2>
              
              <h3>5.1 Where We Store Data</h3>
              <p>
                <strong>We do NOT store personal information on our servers.</strong> All data collection and processing 
                is handled by third-party services (Google Analytics, Google AdSense) subject to their privacy policies 
                and security practices.
              </p>
              <p>
                <strong>Data Retention:</strong> Data retention periods are determined by third-party service providers:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> 26 months (configurable)</li>
                <li><strong>Google AdSense:</strong> Varies by data type (see Google's retention policy)</li>
                <li><strong>Essential Cookies:</strong> Session-based or until manually deleted</li>
              </ul>

              <h3>5.2 Security Measures</h3>
              <p>
                While we do not store personal data ourselves, we implement security best practices:
              </p>
              <ul>
                <li><strong>HTTPS Encryption:</strong> All data transmitted to/from our Site is encrypted via SSL/TLS</li>
                <li><strong>Trusted Third Parties:</strong> We only work with reputable service providers with strong security practices</li>
                <li><strong>Regular Updates:</strong> We keep our software and dependencies up to date</li>
                <li><strong>Access Controls:</strong> Limited access to website administration</li>
              </ul>
              <p>
                <strong>No Data Breach History:</strong> We have not experienced any data breaches. In the event of a 
                breach affecting personal information, we will notify affected users as required by law.
              </p>
            </section>

            {/* Section 6: Your Privacy Rights */}
            <section id="your-rights">
              <h2 className="text-gray-900 dark:text-white">6. Your Privacy Rights (GDPR, CCPA/CPRA, and Other Laws)</h2>
              
              <p>
                Depending on your location, you may have certain privacy rights regarding your personal information:
              </p>

              <h3>6.1 GDPR Rights (European Economic Area)</h3>
              <p>
                If you are in the EEA, you have the following rights under GDPR:
              </p>
              <ul>
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to data processing for direct marketing or legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (without affecting prior processing)</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
              </ul>

              <h3>6.2 CCPA/CPRA Rights (California Residents)</h3>
              <p>
                If you are a California resident, you have the following rights under CCPA/CPRA:
              </p>
              <ul>
                <li><strong>Right to Know:</strong> Request disclosure of personal information collected, used, shared, or sold</li>
                <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of the "sale" or "sharing" of personal information</li>
                <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Right to Limit Use:</strong> Limit use and disclosure of sensitive personal information</li>
                <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
              </ul>

              <h3>6.3 Other U.S. State Privacy Laws</h3>
              <p>
                Residents of Virginia, Colorado, Connecticut, Utah, Iowa, Nebraska, New Hampshire, New Jersey, and Delaware 
                have similar privacy rights under their respective state laws (effective 2025).
              </p>

              <h3>6.4 How to Exercise Your Rights</h3>
              <p>
                To exercise any of these rights, contact us at:{' '}
                <a href={`mailto:${contactEmail}?subject=Privacy Rights Request`} className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">{contactEmail}</a>
              </p>
              <p>
                <strong>Response Time:</strong> We will respond to verified requests within 30-45 days as required by law.
              </p>
              <p>
                <strong>Identity Verification:</strong> We may request additional information to verify your identity 
                before processing requests.
              </p>

              <div className="not-prose bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-6">
                <h4 className="text-lg font-bold text-green-900 dark:text-green-50 mb-3">
                  🌐 Global Privacy Control (GPC) Support
                </h4>
                <p className="text-green-800 dark:text-green-100 text-sm">
                  We honor{' '}
                  <a 
                    href="https://globalprivacycontrol.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-green-900 dark:hover:text-green-50 font-medium text-green-800 dark:text-green-100"
                  >
                    Global Privacy Control (GPC)
                  </a>{' '}
                  signals. If your browser sends a GPC signal, we will treat it as an opt-out request for the sale/sharing 
                  of personal information under applicable privacy laws.
                </p>
              </div>
            </section>

            {/* Section 7: Children's Privacy */}
            <section id="childrens-privacy">
              <h2 className="text-gray-900 dark:text-white">7. Children's Privacy (COPPA Compliance)</h2>
              <p>
                Our Site is not directed at children under the age of 13, and we do not knowingly collect personal 
                information from children under 13 without verifiable parental consent.
              </p>
              <p>
                If we become aware that we have inadvertently collected personal information from a child under 13, 
                we will take steps to delete such information as soon as possible.
              </p>
              <p>
                <strong>Parents/Guardians:</strong> If you believe your child has provided personal information to us, 
                please contact us at <a href={`mailto:${contactEmail}`} className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">{contactEmail}</a> so we can remove it.
              </p>
            </section>

            {/* Section 8: International Data Transfers */}
            <section id="international-transfers">
              <h2 className="text-gray-900 dark:text-white">8. International Data Transfers</h2>
              <p>
                Our Site is hosted in [⚠️ SPECIFY YOUR HOSTING LOCATION: e.g., United States, EU]. If you access our 
                Site from outside this region, your information may be transferred to, stored in, and processed in 
                countries where our third-party service providers operate.
              </p>
              <p>
                These countries may have data protection laws different from your country. By using our Site, you consent 
                to such transfers. We ensure appropriate safeguards are in place, such as:
              </p>
              <ul>
                <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                <li>Privacy Shield Framework compliance (where applicable)</li>
                <li>Adequacy decisions by regulatory authorities</li>
              </ul>
            </section>

            {/* Section 9: Do Not Track Signals */}
            <section id="do-not-track">
              <h2 className="text-gray-900 dark:text-white">9. Do Not Track (DNT) Signals</h2>
              <p>
                Some browsers have a "Do Not Track" (DNT) feature that signals to websites you visit that you do not 
                want your online activity tracked.
              </p>
              <p>
                <strong>Our Response:</strong> We honor Global Privacy Control (GPC) signals but do not currently 
                respond to DNT signals due to lack of industry-wide standards. However, you can control tracking through:
              </p>
              <ul>
                <li>Browser cookie settings</li>
                <li>Third-party opt-out tools (Google Ads Settings, NAI opt-out)</li>
                <li>Global Privacy Control (GPC)</li>
                <li>Browser extensions (Privacy Badger, uBlock Origin)</li>
              </ul>
            </section>

            {/* Section 10: Changes to This Policy */}
            <section id="policy-changes">
              <h2 className="text-gray-900 dark:text-white">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal 
                requirements, or other factors.
              </p>
              <p>
                <strong>Notification of Changes:</strong> When we make significant changes, we will:
              </p>
              <ul>
                <li>Update the "Last Updated" date at the top of this page</li>
                <li>Post a notice on our homepage for 30 days</li>
                <li>Notify users via email (if we have your contact information)</li>
              </ul>
              <p>
                <strong>Your Responsibility:</strong> Please review this Privacy Policy periodically. Continued use of 
                our Site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 11: Contact Us */}
            <section id="contact">
              <h2 className="text-gray-900 dark:text-white">11. Contact Us</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us:
              </p>
              
              <div className="not-prose bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 my-6">
                <p className="text-gray-900 dark:text-white font-semibold mb-4">
                  {siteName} - Privacy Contact
                </p>
                <dl className="space-y-3 text-gray-800 dark:text-gray-200">
                  <div>
                    <dt className="font-semibold inline">Email:</dt>
                    <dd className="inline ml-2">
                      <a 
                        href={`mailto:${contactEmail}?subject=Privacy Policy Inquiry`}
                        className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
                      >
                        {contactEmail}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Subject Line:</dt>
                    <dd className="inline ml-2">"Privacy Policy Inquiry" or "Privacy Rights Request"</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">Response Time:</dt>
                    <dd className="inline ml-2">30-45 days for privacy rights requests</dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Additional Resources */}
            <section id="resources">
              <h2 className="text-gray-900 dark:text-white">12. Additional Resources</h2>
              <p>
                For more information about privacy and data protection:
              </p>
              <ul>
                <li>
                  <Link to="/terms" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/dmca" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">DMCA & Copyright Policy</Link>
                </li>
                <li>
                  <Link to="/about" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">About {siteName}</Link>
                </li>
                <li>
                  <a href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    FTC Privacy & Security Resources
                  </a>
                </li>
                <li>
                  <a href="https://gdpr.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    GDPR Information Portal
                  </a>
                </li>
                <li>
                  <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100">
                    California CCPA/CPRA Information
                  </a>
                </li>
              </ul>
            </section>

            {/* Footer */}
            <footer className="not-prose mt-12 pt-6 border-t border-gray-300 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                <strong>Last Updated:</strong> {lastUpdated}<br />
                <strong>Effective Date:</strong> {effectiveDate}<br />
                <strong>Policy Version:</strong> 2.0
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-4">
                This Privacy Policy is drafted in compliance with GDPR (EU), CCPA/CPRA (California), and other applicable 
                U.S. state privacy laws effective in 2025. We reserve the right to update this policy to reflect changes 
                in law, technology, or our practices.
              </p>
            </footer>

          </article>
        </div>
      </div>
    </>
  );
}