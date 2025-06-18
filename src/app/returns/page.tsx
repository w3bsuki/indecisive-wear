/**
 * Returns & Refunds Policy Page
 */

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Refunds</h1>
      
      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">30-Day Return Policy</h2>
          <p className="text-gray-700 mb-4">
            We want you to be completely satisfied with your purchase. If you&apos;re not happy with your order, 
            you can return it within 30 days of delivery for a full refund.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Items must be in original condition with tags attached</li>
            <li>Items must be unworn and unwashed</li>
            <li>Original packaging must be included</li>
            <li>Custom or personalized items are not returnable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Return</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Contact us at returns@indecisivewear.com with your order number</li>
            <li>We&apos;ll send you a return label and instructions</li>
            <li>Package your items securely with the return form</li>
            <li>Drop off at the nearest post office or schedule pickup</li>
            <li>We&apos;ll process your refund within 5-7 business days of receiving your return</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Processing</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Refunds are processed to the original payment method</li>
            <li>Processing time: 5-7 business days after we receive your return</li>
            <li>Original shipping costs are non-refundable</li>
            <li>Return shipping costs are deducted from refund (unless item was defective)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Exchanges</h2>
          <p className="text-gray-700">
            We currently don&apos;t offer direct exchanges. If you need a different size or color, 
            please return the original item and place a new order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Damaged or Defective Items</h2>
          <p className="text-gray-700">
            If you receive a damaged or defective item, contact us immediately at support@indecisivewear.com. 
            We&apos;ll arrange a free return and send you a replacement or full refund.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Questions about returns or refunds?
            <br />
            Email: returns@indecisivewear.com
            <br />
            Phone: +359 XXX XXX XXX (Bulgarian number to be added)
            <br />
            Business hours: Monday-Friday, 9 AM - 6 PM (EET)
          </p>
        </section>
      </div>
    </div>
  )
}