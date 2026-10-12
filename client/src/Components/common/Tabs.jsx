import PropTypes from "prop-types";

// Underlined tab bar. `tabs` are values or { value, label } pairs.
function Tabs({ tabs, value, onChange }) {
  return (
    <div className="border-b border-line flex overflow-x-auto">
      {tabs.map((tab) => {
        const { value: v, label } =
          typeof tab === "object" ? tab : { value: tab, label: tab };
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`px-6 py-4 font-poppins text-sm whitespace-nowrap ${
              value === v
                ? "border-b-2 border-primary text-primary font-semibold"
                : "text-ink hover:text-primary"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.node }),
    ])
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tabs;
