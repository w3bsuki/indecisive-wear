/**
 * Terms of Service Page
 */

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700">
            By accessing and using this website, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, 
            please do not use this service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Products and Services</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>All product descriptions and prices are subject to change without notice</li>
            <li>We reserve the right to refuse or cancel any order for any reason</li>
            <li>All sales are final unless covered by our return policy</li>
            <li>Products are shipped from Bulgaria</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment and Pricing</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Prices are displayed in Bulgarian Lev (BGN) or US Dollars (USD)</li>
            <li>Payment is processed securely through Stripe</li>
            <li>You must provide accurate billing information</li>
            <li>Additional taxes or duties may apply for international orders</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping and Delivery</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Shipping times are estimates and not guaranteed</li>
            <li>Risk of loss transfers to you upon delivery</li>
            <li>International customers are responsible for customs fees</li>
            <li>We are not responsible for packages lost or stolen after delivery</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this website, including designs, logos, and text, is the property of 
            Indecisive Wear and is protected by copyright and trademark laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700">
            Indecisive Wear shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages arising from your use of our products or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Governing Law</h2>
          <p className="text-gray-700">
            These terms are governed by the laws of Bulgaria. Any disputes will be resolved 
            in the courts of Sofia, Bulgaria.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700">
            For questions about these terms:
            <br />
            Email: legal@indecisivewear.com
            <br />
            Company: Indecisive Wear Ltd.
            <br />
            Address: Sofia, Bulgaria (full address to be added)
          </p>
        </section>
      </div>
    </div>
  )
}