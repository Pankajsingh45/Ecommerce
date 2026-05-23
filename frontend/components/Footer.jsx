export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">ShopEase</h2>
          <p className="text-gray-400">
            A modern ecommerce platform built with Next.js, Tailwind CSS,
            Node.js and Razorpay.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Checkout</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">support@shopease.com</p>
          <p className="text-gray-400">Meerut, India</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
