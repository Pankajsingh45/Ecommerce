"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import API from "../../../lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    await API.post("/products", form);

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });

    fetchProducts();
    alert("Product added successfully");
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-5 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">Manage Products</h1>

        <form
          onSubmit={addProduct}
          className="bg-white rounded-2xl shadow p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-5">Add New Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
              placeholder="Product Name"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
              placeholder="Price"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
              placeholder="Category"
            />

            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
              placeholder="Stock"
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3 md:col-span-2"
              placeholder="Image URL"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3 md:col-span-2"
              placeholder="Description"
              rows="4"
            />
          </div>

          <button className="mt-5 bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-700">
            Add Product
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-5">Product List</h2>

          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b">
                <th className="py-3">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No products added yet.
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
