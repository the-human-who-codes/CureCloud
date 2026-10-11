import { useId } from "react";
import PropTypes from "prop-types";

const inputClasses =
  "w-full px-4 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins";

// Label + input/select pair. Extra props go to the control; pass <option>s as children for selects.
// `compact` gives a shorter control for filter bars.
export function FormField({
  label,
  as: Control = "input",
  wrapperClassName,
  compact = false,
  children,
  ...props
}) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block font-poppins text-sm text-ink mb-2">
        {label}
      </label>
      <Control
        id={id}
        className={`${inputClasses} ${compact ? "py-2" : "py-3"}`}
        {...props}
      >
        {children}
      </Control>
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  wrapperClassName: PropTypes.string,
  compact: PropTypes.bool,
  children: PropTypes.node,
};
