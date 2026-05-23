"use client";

import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <>
      <Navbar />

      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="bg-white shadow rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 mb-4"
          />

          <button
            onClick={() => login("admin@gmail.com")}
            className="w-full bg-gray-900 text-white py-3 rounded-xl"
          >
            Login
          </button>

          <p className="text-center text-gray-500 mt-5">
            New user?{" "}
            <a href="/register" className="text-black">
              Register
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
