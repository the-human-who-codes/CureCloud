import MockData from "../../data/MockData";
import PrescriptionsCard from "./PrescriptionsCard";

const PatientPrescriptions = () => {
  const mockPrescriptions = MockData.prescriptions;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Current Prescriptions
      </h2>
      <div className="space-y-4">
        {mockPrescriptions.map((prescription) => (
          <PrescriptionsCard
            key={prescription.id}
            prescription={prescription}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientPrescriptions;
