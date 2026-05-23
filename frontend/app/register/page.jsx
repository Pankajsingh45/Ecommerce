import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="bg-white shadow rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-xl px-4 py-3 mb-4"
          />

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

          <button className="w-full bg-gray-900 text-white py-3 rounded-xl">
            Create Account
          </button>
        </div>
      </section>
    </>
  );
}
