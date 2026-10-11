import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import PrescriptionsCard from "./PrescriptionsCard";

// Card listing a useApi() result of prescriptions.
export function PrescriptionsList({ prescriptions }) {
  return (
    <Card title="Current Prescriptions">
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
    </Card>
  );
}

PrescriptionsList.propTypes = {
  prescriptions: PropTypes.object.isRequired,
};

const PatientPrescriptions = () => {
  const prescriptions = useApi(() =>
    api.listPrescriptions({ status: "active" })
  );
  return <PrescriptionsList prescriptions={prescriptions} />;
};

export default PatientPrescriptions;
