import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

/**
 * Terms of Service Page
 * REQUIRED for AdSense approval and legal compliance
 * ⚠️ HUMAN REVIEW: Customize with your actual business practices
 */
export default function Terms() {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const siteName = import.meta.env.VITE_SITE_NAME || 'Archive Movies';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
  const lastUpdated = 'October 19, 2025';

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of service for Archive Movies website. Read our usage guidelines and legal agreements."
        canonical={`${siteUrl}/terms`}
      />

      <article className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
          </header>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 prose dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to {siteName}. By accessing or using our website at{' '}
                <a href={siteUrl} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {siteUrl}
                </a>, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are 
                prohibited from using or accessing this site.
              </p>
            </section>

            {/* Use License */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Use License
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on {siteName} for 
                personal, non-commercial viewing only. This is the grant of a license, not a 
                transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            {/* Content Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Content and Copyright
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>Important:</strong> {siteName} does not host or store any movie files. 
                All content is streamed directly from Internet Archive (archive.org) servers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We make every effort to ensure all indexed content is in the public domain or 
                openly licensed. However, we do not guarantee the copyright status of any material. 
                Users are responsible for verifying the copyright status before downloading or 
                redistributing any content.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you believe any content infringes your copyright, please review our{' '}
                <Link to="/dmca" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  DMCA Policy
                </Link>{' '}
                and contact us immediately.
              </p>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. User Conduct
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You agree not to use {siteName} to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Transmit any malicious code, viruses, or harmful components</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Collect or harvest personal information about other users</li>
                <li>Use automated systems (bots, scrapers) without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Disclaimer
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  THE MATERIALS ON {siteName.toUpperCase()} ARE PROVIDED ON AN "AS IS" BASIS. 
                  {siteName.toUpperCase()} MAKES NO WARRANTIES, EXPRESSED OR IMPLIED.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {siteName} does not warrant or make any representations concerning:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-3">
                <li>The accuracy, reliability, or completeness of materials</li>
                <li>The availability or uptime of the website</li>
                <li>The copyright status of indexed content</li>
                <li>The quality or suitability of any content for your purposes</li>
              </ul>
            </section>

            {/* Limitations */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Limitations of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In no event shall {siteName} or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on {siteName}, even if {siteName} or a {siteName} authorized representative has 
                been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our website uses third-party services including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Internet Archive:</strong> All movie content is provided by Internet 
                  Archive. Their{' '}
                  <a 
                    href="https://archive.org/about/terms.php" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Terms of Service
                  </a>{' '}
                  apply to all embedded content.
                </li>
                <li>
                  <strong>Google AdSense:</strong> We use Google AdSense for advertising. 
                  Google's privacy policy and terms apply to ads displayed on our site.
                </li>
                <li>
                  <strong>Analytics:</strong> We may use analytics services to improve user 
                  experience. See our{' '}
                  <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  for details.
                </li>
              </ul>
            </section>

            {/* Links to Other Sites */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Links to Other Websites
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our website contains links to third-party websites. We have no control over 
                and assume no responsibility for the content, privacy policies, or practices 
                of any third-party sites or services. We strongly advise you to review the 
                terms and privacy policies of any sites you visit.
              </p>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Revisions and Errata
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The materials appearing on {siteName} may include technical, typographical, 
                or photographic errors. {siteName} does not warrant that any of the materials 
                are accurate, complete, or current. {siteName} may make changes to the materials 
                at any time without notice.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with 
                the laws of your jurisdiction and you irrevocably submit to the exclusive 
                jurisdiction of the courts in that location.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your access to our website immediately, without 
                prior notice or liability, for any reason whatsoever, including without 
                limitation if you breach these Terms. All provisions of the Terms which by 
                their nature should survive termination shall survive termination.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                12. Changes to Terms of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms 
                at any time. If a revision is material, we will try to provide at least 30 days' 
                notice prior to any new terms taking effect. What constitutes a material change 
                will be determined at our sole discretion.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                13. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">
                  {siteName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Email:{' '}
                  <a 
                    href={`mailto:${contactEmail}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {contactEmail}
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Website:{' '}
                  <a 
                    href={siteUrl}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {siteUrl}
                  </a>
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Acknowledgment
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                BY USING {siteName.toUpperCase()}, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE 
                TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
              </p>
            </section>

          </div>

          {/* Related Links */}
          <footer className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/dmca"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              DMCA Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              About Us
            </Link>
          </footer>

        </div>
      </article>
    </>
  );
}
