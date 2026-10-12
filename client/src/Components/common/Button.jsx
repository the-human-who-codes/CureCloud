import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VARIANTS = {
  primary: "bg-primary text-white font-semibold hover:bg-primary-hover",
  secondary: "bg-surface text-primary hover:bg-line",
  outline: "border border-primary text-primary font-semibold hover:bg-line",
  danger: "bg-red-50 text-red-600 hover:bg-red-100",
};
const SIZES = { md: "px-6 py-3", sm: "px-3 py-1.5 text-sm" };

// Call-to-action button (page headers, forms, row actions).
export function Button({
  icon,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${SIZES[size]} ${VARIANTS[variant]} rounded-lg font-poppins transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.object,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  size: PropTypes.oneOf(Object.keys(SIZES)),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
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
    <button
      type="button"
      className={`p-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  className: PropTypes.string,
};
