import PropTypes from "prop-types";
import PatientCard from "../PatientCard/PatientCard";
import { Section } from "../common/Card";

const PatientsSection = ({ patients, onView }) => {
  return (
    <Section title="My Patients" className="lg:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <PatientCard
            key={patient.patientId}
            {...patient}
            onView={onView ? () => onView(patient.patientId) : undefined}
          />
        ))}
      </div>
    </Section>
  );
};

PatientsSection.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      patientId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onView: PropTypes.func,
};

export default PatientsSection;
