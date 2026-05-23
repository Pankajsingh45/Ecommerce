"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, totalAmount } = useCart();

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">
              Add products to continue shopping.
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 bg-gray-900 text-white px-8 py-3 rounded-xl"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-gray-500">{item.category}</p>
                    <p className="font-bold mt-3">₹{item.price}</p>
                    <p className="text-sm mt-1">Quantity: {item.quantity}</p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-4 text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow p-6 h-fit">
              <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <Link
                href="/checkout"
                className="block text-center mt-6 bg-gray-900 text-white py-3 rounded-xl"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
