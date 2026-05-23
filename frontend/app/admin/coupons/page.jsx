"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import API from "../../../lib/api";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    expiryDate: "",
  });

  const fetchCoupons = async () => {
    const res = await API.get("/coupons");
    setCoupons(res.data.coupons);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCoupon = async (e) => {
    e.preventDefault();

    await API.post("/coupons", form);

    setForm({
      code: "",
      discount: "",
      expiryDate: "",
    });

    fetchCoupons();
    alert("Coupon added successfully");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-5 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">
          Discount Coupons
        </h1>

        <form
          onSubmit={addCoupon}
          className="bg-white rounded-2xl shadow p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-5">Generate Coupon</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              placeholder="Coupon Code"
              required
            />

            <input
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              placeholder="Discount %"
              required
            />

            <input
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              required
            />
          </div>

          <button className="mt-5 bg-gray-900 text-white px-8 py-3 rounded-xl">
            Add Coupon
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-5">Coupon List</h2>

          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="py-3">Code</th>
                <th>Discount</th>
                <th>Expiry</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b">
                  <td className="py-3 font-semibold">{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td className="text-green-600 font-medium">Active</td>
                </tr>
              ))}

              {coupons.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No coupons added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
