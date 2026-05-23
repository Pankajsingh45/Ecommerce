"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Admin", path: "/admin/dashboard" },
    { name: "Orders", path: "/orders" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          ShopEase
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-700 hover:text-black font-medium"
            >
              {link.name}
            </Link>
          ))}

          <Link href="/cart" className="relative text-xl">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-5 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block text-gray-700 font-medium"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/cart" className="flex items-center gap-2">
            <FaShoppingCart /> Cart ({cartItems.length})
          </Link>
        </div>
      )}
    </nav>
  );
}
