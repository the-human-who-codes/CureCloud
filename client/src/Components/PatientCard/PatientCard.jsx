import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../common/Card";
import InitialsAvatar from "../common/InitialsAvatar";
import StatusBadge from "../common/StatusBadge";

// Summary card for one patient (dashboards). The Firestore ID is only the key and link target.
function PatientCard({ name, folderNumber, age, sex, room, acuity, onView }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <InitialsAvatar name={name} large />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-poppins text-lg font-semibold text-primary">
              {name}
            </h3>
            {acuity && <StatusBadge status={acuity} size="sm" />}
          </div>
          {folderNumber && (
            <p className="font-poppins text-sm text-ink">
              Folder {folderNumber}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-poppins text-sm text-ink">Age/Sex:</span>
          <span className="font-poppins text-sm font-medium text-primary">
            {age ?? "—"} / {sex ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-poppins text-sm text-ink">Room:</span>
          <span className="font-poppins text-sm font-medium text-primary">
            {room ?? "Not admitted"}
          </span>
        </div>
      </div>

      {onView && (
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onView}
            className="flex-1 px-4 py-2 bg-surface text-primary rounded-lg font-poppins text-sm hover:bg-line transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            View
          </button>
        </div>
      )}
    </Card>
  );
}

PatientCard.propTypes = {
  name: PropTypes.string,
  folderNumber: PropTypes.string,
  age: PropTypes.number,
  sex: PropTypes.string,
  room: PropTypes.string,
  acuity: PropTypes.string,
  onView: PropTypes.func,
};

export default PatientCard;
