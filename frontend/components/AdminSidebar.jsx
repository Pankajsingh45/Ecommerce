import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="bg-gray-900 text-white w-full lg:w-64 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

      <nav className="space-y-4">
        <Link href="/admin/dashboard" className="block hover:text-gray-300">
          Dashboard
        </Link>

        <Link href="/admin/products" className="block hover:text-gray-300">
          Products
        </Link>

        <Link href="/admin/orders" className="block hover:text-gray-300">
          Orders
        </Link>

        <Link href="/admin/customers" className="block hover:text-gray-300">
          Customers
        </Link>

        <Link href="/admin/coupons" className="block hover:text-gray-300">
          Coupons
        </Link>

        <Link href="/" className="block hover:text-gray-300">
          Back to Store
        </Link>
      </nav>
    </aside>
  );
}
