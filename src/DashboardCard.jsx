function DashboardCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    green: "bg-green-50 border-green-200 text-green-700",
  };

  const valueColors = {
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  };

  return (
    <div className={`rounded-xl border-2 p-6 flex flex-col gap-1 ${colors[color] ?? "bg-gray-50 border-gray-200 text-gray-700"}`}>
      <span className="text-sm font-semibold uppercase tracking-wide opacity-70">{title}</span>
      <span className={`text-4xl font-bold ${valueColors[color] ?? "text-gray-600"}`}>{value}</span>
    </div>
  );
}

export default DashboardCard;
