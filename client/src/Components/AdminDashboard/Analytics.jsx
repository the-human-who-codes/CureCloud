function Analytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        "Patient Demographics",
        "Appointment Distribution",
        "Revenue Analytics",
        "Resource Utilization",
      ].map((title) => (
        <div
          key={title}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]"
        >
          <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
            {title}
          </h2>
          <div className="h-[200px] bg-[#f8faff] rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}

export default Analytics;
