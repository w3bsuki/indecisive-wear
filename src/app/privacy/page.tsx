/**
 * Privacy Policy Page - GDPR Compliant
 */


export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personal information (name, email, address) when you make a purchase</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Website usage data through cookies and analytics</li>
            <li>Communication preferences and customer support interactions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Provide customer support</li>
            <li>Improve our website and services</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to protect your personal information. 
            All payment data is processed securely through Stripe and we never store credit card information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights (GDPR)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to erase your data</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            For questions about this privacy policy or to exercise your rights, contact us at:
            <br />
            Email: privacy@indecisivewear.com
            <br />
            Address: Bulgaria (full address to be added)
          </p>
        </section>
      </div>
    </div>
  )
}