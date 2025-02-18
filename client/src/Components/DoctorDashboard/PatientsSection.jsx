import PatientCard from "../PatientCard/PatientCard";
import PropTypes from "prop-types";

const PatientsSection = ({ patients }) => {
  return (
    <div className="lg:col-span-2">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Recent Patients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <PatientCard
            key={patient.patientId}
            {...patient}
            onView={() => {}}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

PatientsSection.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      patientId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PatientsSection;
