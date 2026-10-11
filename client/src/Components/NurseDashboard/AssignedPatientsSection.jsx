import PropTypes from "prop-types";
import { Card } from "../common/Card";

const AssignedPatientsSection = ({ patients }) => (
  <Card title="Assigned Patients">
    <div className="grid gap-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex items-center justify-between p-4 bg-surface rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <img
              src={patient.image}
              alt={patient.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-primary font-medium">{patient.name}</p>
              <p className="text-sm text-ink">Room {patient.room}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

AssignedPatientsSection.propTypes = {
  patients: PropTypes.array.isRequired,
};

export default AssignedPatientsSection;
