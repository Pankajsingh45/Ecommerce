"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          {loading ? (
            <p>Loading your orders...</p>
          ) : error ? (
            <p className="text-red-600">Something went wrong: {error}</p>
          ) : orders.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
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
                    <td className="py-3 font-semibold">
                      #ORD{String(order.id).padStart(3, "0")}
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>Razorpay</td>
                    <td>₹{order.total}</td>
                    <td
                      className={
                        order.status === "Delivered"
                          ? "text-green-600 font-medium"
                          : order.status === "Processing" ||
                              order.status === "pending"
                            ? "text-yellow-600 font-medium"
                            : "text-gray-600 font-medium"
                      }
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
