import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import StatusBadge from "../common/StatusBadge";

// Allergies shown prominently, distinguishing "no known allergies" from "not recorded".
function AllergyList({ allergies = [], noKnownAllergies }) {
  if (!allergies.length)
    return (
      <p className="font-poppins text-sm text-ink">
        {noKnownAllergies ? "No known allergies" : "Allergies not recorded"}
      </p>
    );
  return (
    <ul className="space-y-1">
      {allergies.map((a) => (
        <li
          key={a.substance}
          className="flex items-center gap-2 font-poppins text-sm text-red-700"
        >
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span className="font-semibold">{a.substance}</span>
          {a.reaction && <span>({a.reaction})</span>}
          <StatusBadge status={a.severity} size="sm" />
        </li>
      ))}
    </ul>
  );
}

AllergyList.propTypes = {
  allergies: PropTypes.arrayOf(
    PropTypes.shape({
      substance: PropTypes.string.isRequired,
      reaction: PropTypes.string,
      severity: PropTypes.string,
    })
  ),
  noKnownAllergies: PropTypes.bool,
};

export default AllergyList;
