"use client";

import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden">
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">{product.category}</p>

        <h3 className="text-lg font-bold mt-1 text-gray-900">{product.name}</h3>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold">₹{product.price}</p>
          <p className="text-sm text-green-600 font-medium">
            {product.stock} in stock
          </p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-5 w-full bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700 transition"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
