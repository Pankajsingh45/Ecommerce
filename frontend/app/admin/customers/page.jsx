import AdminSidebar from "../../../components/AdminSidebar";

export default function CustomersPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <h1 className="text-4xl font-bold mb-8">Customer List</h1>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Total Spend</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Pankaj Negi</td>
                <td>pankaj@gmail.com</td>
                <td>4</td>
                <td>₹8999</td>
              </tr>

              <tr>
                <td className="py-3">Aakash Tiwari</td>
                <td>aakash@gmail.com</td>
                <td>2</td>
                <td>₹4499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
