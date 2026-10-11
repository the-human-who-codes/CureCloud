import { useId } from "react";
import PropTypes from "prop-types";

export const inputClasses =
  "w-full px-4 py-3 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins";

// Label + input/select pair. Extra props go to the control; pass <option>s as children for selects.
export function FormField({
  label,
  as: Control = "input",
  wrapperClassName,
  inputClassName = inputClasses,
  children,
  ...props
}) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block font-poppins text-sm text-ink mb-2">
        {label}
      </label>
      <Control id={id} className={inputClassName} {...props}>
        {children}
      </Control>
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  wrapperClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  children: PropTypes.node,
};
