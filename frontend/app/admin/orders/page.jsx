"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import API from "../../../lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await API.get("/orders");
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-bold mb-8">Order List</h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
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
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3">
                      #ORD{String(order.id).padStart(3, "0")}
                    </td>
                    <td>{order.user?.name || "N/A"}</td>
                    <td>Razorpay</td>
                    <td>₹{order.total}</td>
                    <td
                      className={
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Processing" ||
                              order.status === "pending"
                            ? "text-yellow-600"
                            : "text-gray-600"
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
      </main>
    </div>
  );
}
