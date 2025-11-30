export default function DashboardCards() {
  const stats = [
    { title: "Total Products", value: 120 },
    { title: "Orders Today", value: 45 },
    { title: "Total Customers", value: 350 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      {stats.map((stat) => (
        <div key={stat.title} className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-gray-500">{stat.title}</h2>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
