import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { humanizeKey } from "../../utils/format";
import { cardClasses } from "./Card";

const TONES = {
  primary: { value: "text-primary", icon: "bg-surface text-primary" },
  danger: { value: "text-[#dc2626]", icon: "bg-red-50 text-[#dc2626]" },
  success: { value: "text-[#059669]", icon: "bg-green-50 text-[#059669]" },
  warning: { value: "text-[#eab308]", icon: "bg-yellow-50 text-[#eab308]" },
};

// One headline number with a label and a round icon.
export function StatCard({ label, value, icon, tone = "primary" }) {
  const colours = TONES[tone];
  return (
    <div className={`${cardClasses} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-poppins text-ink text-sm">{label}</p>
          <p className={`font-poppins text-2xl font-bold ${colours.value}`}>
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${colours.icon}`}
        >
          {icon && <FontAwesomeIcon icon={icon} className="text-xl" />}
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.object,
  tone: PropTypes.oneOf(Object.keys(TONES)),
};

// Responsive row of StatCards built from a { camelCaseKey: value } object.
// `icons` / `tones` map keys to an icon / tone (or are functions of the key);
// `label` turns a key into its caption.
export function StatGrid({
  stats,
  icons = {},
  tones = {},
  label = humanizeKey,
}) {
  const pick = (source, key) =>
    typeof source === "function" ? source(key) : source[key];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(stats).map(([key, value]) => (
        <StatCard
          key={key}
          label={label(key)}
          value={value}
          icon={pick(icons, key)}
          tone={pick(tones, key)}
        />
      ))}
    </div>
  );
}

StatGrid.propTypes = {
  stats: PropTypes.object.isRequired,
  icons: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  tones: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  label: PropTypes.func,
};
