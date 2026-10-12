import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { admissionLabel } from "../../utils/patients";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import InitialsAvatar from "../common/InitialsAvatar";
import StatusBadge from "../common/StatusBadge";

const AssignedPatientsSection = ({ patients }) => (
  <Card title="Assigned Patients">
    <AsyncContent
      {...patients}
      empty={patients.data?.data.length === 0}
      emptyText="No patients in your ward or care team."
    >
      <div className="grid gap-4">
        {patients.data?.data.map((patient) => (
          <div
            key={patient.id}
            className="flex items-center justify-between p-4 bg-surface rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <InitialsAvatar name={patient.name} />
              <div>
                <p className="text-primary font-medium">{patient.name}</p>
                <p className="text-sm text-ink">
                  {admissionLabel(patient.admission) ?? "Not admitted"}
                </p>
              </div>
            </div>
            {patient.acuity && <StatusBadge status={patient.acuity} />}
          </div>
        ))}
      </div>
      <Link
        to="/nurse/my-patients"
        className="block mt-4 font-poppins text-sm text-primary hover:underline"
      >
        All my patients
      </Link>
    </AsyncContent>
  </Card>
);

AssignedPatientsSection.propTypes = {
  patients: PropTypes.object.isRequired,
};

export default AssignedPatientsSection;
