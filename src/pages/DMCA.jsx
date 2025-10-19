import SEO from '../components/SEO';

/**
 * DMCA / Copyright Takedown page
 * REQUIRED for AdSense approval and legal compliance
 */
export default function DMCA() {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

  return (
    <>
      <SEO
        title="DMCA & Copyright Policy"
        description="Copyright infringement and DMCA takedown procedure for Archive Movies"
        canonical={`${siteUrl}/dmca`}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          DMCA & Copyright Policy
        </h1>

        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-900 dark:text-blue-100">
              <strong>Important Notice:</strong> We only index and link to public domain content 
              from Internet Archive. We do not host copyrighted material.
            </p>
          </div>

          <h2>Our Copyright Commitment</h2>
          <p>
            Archive Movies respects intellectual property rights. All content indexed on this 
            site is sourced from Internet Archive (archive.org) and filtered to include only:
          </p>
          <ul>
            <li>Public domain works</li>
            <li>Creative Commons CC0 licensed content</li>
            <li>Content explicitly marked as copyright-free</li>
          </ul>

          <h2>We Do Not Host Content</h2>
          <p>
            This website does not store, host, or distribute movie files. All video playback 
            is embedded directly from Archive.org. Content availability and legality are 
            determined by Archive.org's policies.
          </p>

          <h2>DMCA Takedown Procedure</h2>
          <p>
            If you believe content linked on our site infringes your copyright:
          </p>

          <h3>Step 1: Contact Archive.org</h3>
          <p>
            Since we do not host content, you must first file a DMCA notice with Internet Archive:
          </p>
          <ul>
            <li>Email: <a href="mailto:info@archive.org">info@archive.org</a></li>
            <li>DMCA Page:{' '}
              <a href="https://archive.org/about/dmca.php" target="_blank" rel="noopener noreferrer">
                archive.org/about/dmca.php
              </a>
            </li>
          </ul>

          <h3>Step 2: Notify Us (Optional)</h3>
          <p>
            After filing with Archive.org, you may notify us to remove the link from our index. 
            Send a DMCA notice to: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>

          <p>Your notice must include:</p>
          <ol>
            <li>Your contact information (name, address, phone, email)</li>
            <li>Identification of the copyrighted work</li>
            <li>URL of the infringing content on our site</li>
            <li>Statement of good faith belief that use is unauthorized</li>
            <li>Statement that information is accurate</li>
            <li>Physical or electronic signature</li>
          </ol>

          <h2>Counter-Notification</h2>
          <p>
            If you believe content was removed in error, you may file a counter-notification 
            including:
          </p>
          <ul>
            <li>Your contact information</li>
            <li>Identification of removed content and its former location</li>
            <li>Statement under penalty of perjury that removal was a mistake</li>
            <li>Consent to jurisdiction</li>
            <li>Physical or electronic signature</li>
          </ul>

          <h2>Repeat Infringer Policy</h2>
          <p>
            We will remove content from repeat infringers as identified by Archive.org.
          </p>

          <h2>Contact Information</h2>
          <p>
            <strong>Copyright Agent:</strong><br />
            Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a><br />
            Response time: 48-72 hours
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            Last updated: October 19, 2025
          </p>
        </section>
      </div>
    </>
  );
}
