import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faHeart,
  faHeartbeat,
  faLungs,
  faThermometerHalf,
  faTint,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { formatBloodPressure } from "../../utils/format";

// Displayed measurements: label, icon, unit and how to read a comparable number.
const MEASUREMENTS = [
  ["temperature", "Temperature", faThermometerHalf, "°C"],
  ["bloodPressure", "Blood Pressure", faHeart, "mmHg"],
  ["heartRate", "Heart Rate", faHeartbeat, "bpm"],
  ["oxygenSaturation", "O2 Saturation", faLungs, "%"],
  ["respiratoryRate", "Respiratory Rate", faLungs, "/min"],
  ["bloodGlucose", "Blood Glucose", faTint, "mmol/L"],
  ["weight", "Weight", faWeight, "kg"],
];

const numeric = (key, v) =>
  v == null ? null : key === "bloodPressure" ? v.systolic : v;

// Vital sign tiles. With `previous` (the panel before the latest) each tile shows a trend arrow.
function VitalsGrid({ vitals, previous, keys }) {
  const shown = MEASUREMENTS.filter(([key]) =>
    keys ? keys.includes(key) : vitals?.[key] != null
  );
  if (!shown.length)
    return (
      <p className="font-poppins text-sm text-ink">No vitals recorded yet.</p>
    );
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {shown.map(([key, label, icon, unit]) => {
        const value = vitals?.[key];
        const now = numeric(key, value);
        const before = numeric(key, previous?.[key]);
        const trend =
          now == null || before == null || now === before
            ? null
            : now > before
            ? "up"
            : "down";
        return (
          <div key={key} className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center justify-between mb-2">
              <span className="font-poppins text-sm text-ink">{label}</span>
              <FontAwesomeIcon icon={icon} className="text-primary" />
            </div>
            <div className="font-poppins text-xl font-bold text-primary">
              {value == null
                ? "—"
                : `${
                    key === "bloodPressure" ? formatBloodPressure(value) : value
                  } ${unit}`}
            </div>
            {previous !== undefined && (
              <div className="flex items-center mt-2">
                <FontAwesomeIcon
                  icon={
                    trend === "up"
                      ? faArrowUp
                      : trend === "down"
                      ? faArrowDown
                      : faArrowRight
                  }
                  className="text-gray-400 text-xs mr-1"
                />
                <span className="text-xs text-ink">
                  {before == null ? "No earlier reading" : "From last check"}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

VitalsGrid.propTypes = {
  vitals: PropTypes.object,
  previous: PropTypes.object,
  keys: PropTypes.arrayOf(PropTypes.string),
};

export default VitalsGrid;
