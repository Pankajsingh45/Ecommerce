"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import API from "../../../lib/api";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await API.get("/customers");
        setCustomers(res.data.customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-bold mb-8">Customer List</h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          {loading ? (
            <p>Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="text-gray-500">No customers yet.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spend</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-3">{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.totalOrders}</td>
                    <td>₹{customer.totalSpend}</td>
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
