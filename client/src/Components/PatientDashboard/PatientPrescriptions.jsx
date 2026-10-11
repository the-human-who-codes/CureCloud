import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import PrescriptionsCard from "./PrescriptionsCard";

const PatientPrescriptions = () => {
  const prescriptions = useApi(() =>
    api.listPrescriptions({ status: "active" })
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Current Prescriptions
      </h2>
      <div className="space-y-4">
        <AsyncContent
          {...prescriptions}
          empty={prescriptions.data?.prescriptions.length === 0}
          emptyText="No active prescriptions."
        >
          {prescriptions.data?.prescriptions.map((prescription) => (
            <PrescriptionsCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </AsyncContent>
      </div>
    </div>
  );
};

export default PatientPrescriptions;
