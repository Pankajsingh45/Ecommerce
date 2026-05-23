import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const orders = [
  {
    id: "#ORD001",
    date: "17 May 2026",
    total: 2499,
    payment: "Razorpay",
    status: "Delivered",
  },
  {
    id: "#ORD002",
    date: "16 May 2026",
    total: 1999,
    payment: "Razorpay",
    status: "Processing",
  },
];

export default function OrdersPage() {
  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Order ID</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 font-semibold">{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.payment}</td>
                  <td>₹{order.total}</td>
                  <td className="text-green-600 font-medium">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </>
  );
}
