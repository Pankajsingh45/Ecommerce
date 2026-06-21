"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-300">
              New Collection 2026
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
              Best Products For Your Lifestyle
            </h1>

            <p className="text-gray-300 mt-6 text-lg">
              Shop latest electronics, fashion and accessories with secure
              Razorpay payment.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/products"
                className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold text-center"
              >
                Shop Now
              </a>

              <a
                href="/admin/dashboard"
                className="border border-white px-8 py-3 rounded-xl font-semibold text-center"
              >
                Admin Panel
              </a>
            </div>
          </div>

          <div className="bg-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-7xl font-bold">50%</h2>
            <p className="text-2xl mt-2">Discount Coupons Available</p>
            <p className="text-gray-300 mt-4">
              Apply coupons during checkout and save more.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-500 mt-2">
              Top selling products for this week
            </p>
          </div>

          <a href="/products" className="hidden md:block font-semibold">
            View All →
          </a>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">Something went wrong: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
