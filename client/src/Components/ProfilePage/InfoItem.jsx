import PropTypes from "prop-types";

// Small grey label above a larger value (profile sections).
function InfoItem({ label, value, children }) {
  return (
    <div>
      <p className="font-poppins text-sm text-ink">{label}</p>
      {value !== undefined && <p className="font-poppins text-lg">{value}</p>}
      {children}
    </div>
  );
}

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  children: PropTypes.node,
};

export default InfoItem;
