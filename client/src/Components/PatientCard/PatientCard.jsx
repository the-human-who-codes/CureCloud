import PropTypes from "prop-types";
import defaultAvatar from "../../assets/default-avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../common/Card";

function PatientCard({
  image = defaultAvatar,
  name,
  patientId,
  age,
  gender,
  lastVisit,
  status = "Active",
  onView = () => {},
  onEdit = () => {},
}) {
  const statusColors = {
    Active: "bg-green-500",
    Inactive: "bg-gray-500",
    Critical: "bg-red-500",
    Pending: "bg-yellow-500",
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 w-[320px]">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={`Patient ${name}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins text-lg font-semibold text-primary">
              {name}
            </h3>
            <span
              className={`${statusColors[status]} w-2 h-2 rounded-full`}
            ></span>
          </div>
          <p className="font-poppins text-sm text-ink">ID: {patientId}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-poppins text-sm text-ink">Age/Gender:</span>
          <span className="font-poppins text-sm font-medium text-primary">
            {age ?? "—"} / {gender ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-poppins text-sm text-ink">Last Visit:</span>
          <span className="font-poppins text-sm font-medium text-primary">
            {lastVisit ?? "—"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 px-4 py-2 bg-surface text-primary rounded-lg font-poppins text-sm hover:bg-line transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faEye} className="mr-2" />
          View
        </button>
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2 bg-surface text-primary rounded-lg font-poppins text-sm hover:bg-line transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </button>
      </div>
    </Card>
  );
}

PatientCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  patientId: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.string,
  lastVisit: PropTypes.string,
  status: PropTypes.string,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
};

export default PatientCard;
