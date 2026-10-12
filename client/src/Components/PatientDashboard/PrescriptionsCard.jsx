import PropTypes from "prop-types";
import { formatDate, labelFor } from "../../utils/format";
import { frequencyLabel } from "../../utils/prescriptions";
import StatusBadge from "../common/StatusBadge";

const PrescriptionCard = ({ prescription, children }) => (
  <div className="p-3 bg-surface rounded-lg">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-poppins font-medium text-primary">
          {prescription.medication}
        </p>
        <p className="font-poppins text-sm text-ink">
          {prescription.dose} · {labelFor(prescription.route)} ·{" "}
          {frequencyLabel(prescription)}
        </p>
        {prescription.instructions && (
          <p className="font-poppins text-sm text-ink">
            {prescription.instructions}
          </p>
        )}
        <p className="font-poppins text-xs text-ink mt-1">
          {formatDate(prescription.startDate)}
          {prescription.endDate
            ? ` – ${formatDate(prescription.endDate)}`
            : ""}{" "}
          · {prescription.prescriberName} · Refills: {prescription.refills}
        </p>
      </div>
      {prescription.status !== "active" && (
        <StatusBadge status={prescription.status} size="sm" />
      )}
    </div>
    {children && <div className="mt-3">{children}</div>}
  </div>
);

PrescriptionCard.propTypes = {
  prescription: PropTypes.shape({
    medication: PropTypes.string.isRequired,
    dose: PropTypes.string.isRequired,
    route: PropTypes.string,
    frequency: PropTypes.string.isRequired,
    frequencyText: PropTypes.string,
    instructions: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    prescriberName: PropTypes.string,
    refills: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

export default PrescriptionCard;
