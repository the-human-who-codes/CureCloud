const StatisticsCards = () => {
  const statistics = [
    { title: "Patient Demographics", id: "demographicsChart" },
    { title: "Treatment Types", id: "treatmentChart" },
    { title: "Monthly Visits", id: "visitsChart" },
    { title: "Common Diagnoses", id: "diagnosesChart" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statistics.map((stat) => (
        <div
          key={stat.id}
          className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8ff]"
        >
          <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
            {stat.title}
          </h3>
          <canvas id={stat.id} className="w-full h-[200px]"></canvas>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
