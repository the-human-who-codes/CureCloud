import PropTypes from "prop-types";
import { capitalize } from "../../utils/format";
import { TONE_CLASSES, toneForStatus } from "../../utils/status";

// Rounded status pill. The colour comes from `tone`, or is derived from `status`.
function StatusBadge({ status, tone, children, className = "" }) {
  const classes = TONE_CLASSES[tone ?? toneForStatus(status)];
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-poppins ${classes} ${className}`}
    >
      {children ?? capitalize(String(status ?? "").replace(/[_-]/g, " "))}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
  tone: PropTypes.oneOf(Object.keys(TONE_CLASSES)),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default StatusBadge;
