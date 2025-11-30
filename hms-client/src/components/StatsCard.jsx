export default function StatsCard({ title, value, icon: Icon, color }) {
  if (!Icon) {
    console.error("❌ StatsCard: Icon is undefined!");
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>

        <div className={`p-3 rounded-full ${color}`}>
          {Icon && <Icon className="text-white" size={22} />}
        </div>
      </div>
    </div>
  );
}
