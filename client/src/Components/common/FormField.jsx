import { useId } from "react";
import PropTypes from "prop-types";

const inputClasses =
  "w-full px-4 rounded-lg border focus:border-primary focus:ring-1 focus:ring-primary font-poppins bg-white disabled:bg-surface disabled:text-ink-muted";

// Label + input/select/textarea. Extra props go to the control; pass <option>s as children for
// selects. `compact` gives a shorter control for filter bars; `error` shows a field message.
export function FormField({
  label,
  as: Control = "input",
  wrapperClassName,
  compact = false,
  error,
  hint,
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
        aria-invalid={error ? true : undefined}
        className={`${inputClasses} ${compact ? "py-2" : "py-3"} ${
          error ? "border-red-400" : "border-line"
        }`}
        {...props}
      >
        {children}
      </Control>
      {error ? (
        <p className="mt-1 font-poppins text-xs text-red-600">{error}</p>
      ) : (
        hint && (
          <p className="mt-1 font-poppins text-xs text-ink-muted">{hint}</p>
        )
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  wrapperClassName: PropTypes.string,
  compact: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.node,
  children: PropTypes.node,
};

// Compact labelled <select> for filter bars. `options` are values or { value, label } pairs.
export function FilterSelect({ label, value, onChange, options, className }) {
  return (
    <FormField
      as="select"
      compact
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      wrapperClassName={className}
    >
      {options.map((o) => {
        const { value: v, label: l } =
          typeof o === "object" ? o : { value: o, label: o };
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </FormField>
  );
}

FilterSelect.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.node }),
    ])
  ).isRequired,
  className: PropTypes.string,
};

// Labelled checkbox.
export function Checkbox({ label, checked, onChange, disabled, hint }) {
  const id = useId();
  return (
    <div className="flex items-start gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 text-primary border-line rounded focus:ring-primary"
      />
      <label htmlFor={id} className="font-poppins text-ink">
        {label}
        {hint && <span className="block text-xs text-ink-muted">{hint}</span>}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hint: PropTypes.node,
};
