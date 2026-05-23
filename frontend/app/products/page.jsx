"use client";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

import API from "../../lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortOption === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, sortOption, products]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 min-h-screen px-5 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <h1 className="text-4xl font-bold">All Products</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border bg-white"
            >
              {categories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-3 rounded-xl border bg-white"
            >
              <option value="">Sort By</option>
              <option value="lowToHigh">Price Low to High</option>
              <option value="highToLow">Price High to Low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Products Found
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
