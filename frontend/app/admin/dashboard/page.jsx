"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import StatCard from "../../../components/StatCard";
import { FaBox, FaShoppingBag, FaUsers, FaTag } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    coupons: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [productsRes, ordersRes, customersRes, couponsRes] =
          await Promise.all([
            fetch("http://localhost:5000/api/products"),
            fetch("http://localhost:5000/api/orders", { headers }),
            fetch("http://localhost:5000/api/customers", { headers }),
            fetch("http://localhost:5000/api/coupons", { headers }),
          ]);

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const customersData = await customersRes.json();
        const couponsData = await couponsRes.json();

        setStats({
          products: productsData.products?.length || 0,
          orders: ordersData.orders?.length || 0,
          customers: customersData.customers?.length || 0,
          coupons: couponsData.coupons?.length || 0,
        });

        setRecentOrders(ordersData.orders?.slice(0, 5) || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<FaBox />}
          />
          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon={<FaShoppingBag />}
          />
          <StatCard
            title="Customers"
            value={stats.customers}
            icon={<FaUsers />}
          />
          <StatCard title="Coupons" value={stats.coupons} icon={<FaTag />} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-10">
          <h2 className="text-2xl font-bold mb-5">Recent Orders</h2>

          <div className="overflow-x-auto">
            {loading ? (
              <p>Loading...</p>
            ) : recentOrders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
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
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">
                        #ORD{String(order.id).padStart(3, "0")}
                      </td>
                      <td>{order.user?.name || "N/A"}</td>
                      <td>₹{order.total}</td>
                      <td
                        className={
                          order.status === "Delivered" ||
                          order.status === "Paid"
                            ? "text-green-600"
                            : "text-yellow-600"
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
        </div>
      </main>
    </div>
  );
}
