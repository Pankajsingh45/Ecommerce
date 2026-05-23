"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import API from "../../lib/api";

export default function CheckoutPage() {
  const { totalAmount } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const [discountAmount, setDiscountAmount] = useState(0);

  const applyCoupon = async () => {
    try {
      const res = await API.post("/coupons/apply", {
        code: couponCode,
        totalAmount,
      });

      setFinalAmount(res.data.finalAmount);
      setDiscountAmount(res.data.discountAmount);

      alert("Coupon applied successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid coupon");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-5">
            <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="Full Address"
              className="w-full border rounded-xl px-4 py-3 h-28"
            ></textarea>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="City"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Pincode"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </form>

          <div className="bg-white rounded-2xl shadow p-6 h-fit">
            <h2 className="text-2xl font-bold mb-5">Payment Summary</h2>

            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

            <button
              onClick={applyCoupon}
              className="w-full border border-gray-900 py-3 rounded-xl mb-5"
            >
              Apply Coupon
            </button>

            <div className="flex justify-between mb-3">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between mb-3 text-green-600">
              <span>Discount</span>
              <span>- ₹{discountAmount}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Final Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-xl mt-5">
              Pay with Razorpay Test Mode
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
