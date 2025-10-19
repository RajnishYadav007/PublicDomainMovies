import SEO from '../components/SEO';

/**
 * Privacy Policy page - REQUIRED for AdSense approval
 * ⚠️ HUMAN REVIEW: Customize with your actual practices
 */
export default function Privacy() {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
  const lastUpdated = '2025-01-15';

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Archive Movies website"
        canonical={`${siteUrl}/privacy`}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Last updated: {lastUpdated}
        </p>

        <section className="prose dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect minimal personal information. When you visit our site, we may collect:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
          </ul>

          <h2>2. Cookies and Tracking</h2>
          <p>
            We use cookies for:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for site functionality</li>
            <li><strong>Analytics cookies:</strong> Google Analytics to understand usage patterns</li>
            <li><strong>Advertising cookies:</strong> Google AdSense for ad personalization</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, but this may affect site functionality.
          </p>

          <h2>3. Third-Party Services</h2>
          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements. Google may use cookies and web beacons 
            to collect information about your visits to this and other websites to provide relevant 
            advertisements. You can opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>

          <h3>Archive.org</h3>
          <p>
            Movie content is embedded from Archive.org. Their{' '}
            <a href="https://archive.org/about/terms.php" target="_blank" rel="noopener noreferrer">
              terms and privacy policy
            </a>{' '}
            apply to embedded content.
          </p>

          <h2>4. Data Storage</h2>
          <p>
            We do not store personal information on our servers. All data is processed through 
            third-party services (Google Analytics, Google AdSense) subject to their privacy policies.
          </p>

          <h2>5. Your Rights (GDPR/CCPA)</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Opt-out of data collection</li>
            <li>Lodge a complaint with supervisory authorities</li>
          </ul>

          <h2>6. Children's Privacy</h2>
          <p>
            Our site is not directed at children under 13. We do not knowingly collect information 
            from children.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Check this page for updates.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For privacy concerns, contact us at:{' '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </section>
      </div>
    </>
  );
}
