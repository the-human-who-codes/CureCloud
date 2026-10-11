import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Primary call-to-action button (page headers, forms).
export function Button({ icon, className = "", children, ...props }) {
  return (
    <button
      className={`px-6 py-3 bg-primary text-white rounded-lg font-poppins font-semibold hover:bg-primary-hover transition-colors duration-200 flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Small square icon-only button used in table rows and card headers.
export function IconButton({
  icon,
  className = "text-ink hover:bg-surface",
  ...props
}) {
  return (
    <button className={`p-2 rounded-lg ${className}`} {...props}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  className: PropTypes.string,
};
