"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import API from "../../lib/api";
import { loadRazorpayScript } from "../../lib/razorpay";

export default function CheckoutPage() {
  const { totalAmount, cartItems } = useCart();
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    setFinalAmount(totalAmount);
  }, [totalAmount]);

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
  useEffect(() => {
    async function fetchAvailableCoupons() {
      try {
        const res = await API.get("/coupons/available");
        setAvailableCoupons(res.data.coupons);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    }

    fetchAvailableCoupons();
  }, []);

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const orderRes = await API.post("/payments/create-order", {
        amount: finalAmount,
      });

      const order = orderRes.data.order;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ecommerce Store",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await API.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: finalAmount,
          });

          if (verifyRes.data.success) {
            alert("Payment successful");
          } else {
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#111827",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

            <input
              className="w-full border rounded-xl px-4 py-3 mb-3"
              placeholder="Full Name"
            />
            <input
              className="w-full border rounded-xl px-4 py-3 mb-3"
              placeholder="Phone Number"
            />
            <input
              className="w-full border rounded-xl px-4 py-3 mb-3"
              placeholder="Address"
            />
            <input
              className="w-full border rounded-xl px-4 py-3 mb-3"
              placeholder="City"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>

            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

            <button
              onClick={applyCoupon}
              className="w-full bg-gray-900 text-white py-3 rounded-xl mb-5"
            >
              Apply Coupon
            </button>

            <p>Total Amount ₹{totalAmount}</p>
            <p>Discount - ₹{discountAmount}</p>
            <h3 className="text-2xl font-bold mt-3">
              Final Amount ₹{finalAmount}
            </h3>

            <button
              onClick={handlePayment}
              className="w-full bg-black text-white py-3 rounded-xl mt-6"
            >
              Pay with Razorpay
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
