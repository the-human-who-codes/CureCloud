import PropTypes from "prop-types";

const PrescriptionCard = ({ prescription }) => (
  <div className="p-3 bg-surface rounded-lg">
    <p className="font-poppins font-medium text-primary">
      {prescription.medication}
    </p>
    <p className="font-poppins text-sm text-ink">
      {prescription.dosage} - {prescription.frequency}
    </p>
  </div>
);

PrescriptionCard.propTypes = {
  prescription: PropTypes.shape({
    medication: PropTypes.string.isRequired,
    dosage: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
  }).isRequired,
};

export default PrescriptionCard;
