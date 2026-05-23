import AdminSidebar from "../../../components/AdminSidebar";
import StatCard from "../../../components/StatCard";
import { FaBox, FaShoppingBag, FaUsers, FaTag } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Total Products" value="120" icon={<FaBox />} />
          <StatCard title="Total Orders" value="85" icon={<FaShoppingBag />} />
          <StatCard title="Customers" value="240" icon={<FaUsers />} />
          <StatCard title="Coupons" value="12" icon={<FaTag />} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-10">
          <h2 className="text-2xl font-bold mb-5">Recent Orders</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">#ORD001</td>
                  <td>Pankaj Negi</td>
                  <td>₹2499</td>
                  <td className="text-green-600">Paid</td>
                </tr>

                <tr>
                  <td className="py-3">#ORD002</td>
                  <td>Aakash Tiwari</td>
                  <td>₹1999</td>
                  <td className="text-yellow-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
