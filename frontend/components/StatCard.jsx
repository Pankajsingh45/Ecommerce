export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-gray-900">{value}</h2>
        </div>

        <div className="text-4xl text-gray-700">{icon}</div>
      </div>
    </div>
  );
}
