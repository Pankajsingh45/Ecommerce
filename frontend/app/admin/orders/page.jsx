import AdminSidebar from "../../../components/AdminSidebar";

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-bold mb-8">Order List</h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">#ORD001</td>
                <td>Pankaj Negi</td>
                <td>Razorpay</td>
                <td>₹2499</td>
                <td className="text-green-600">Delivered</td>
              </tr>

              <tr>
                <td className="py-3">#ORD002</td>
                <td>Aakash Tiwari</td>
                <td>COD</td>
                <td>₹1999</td>
                <td className="text-yellow-600">Processing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
