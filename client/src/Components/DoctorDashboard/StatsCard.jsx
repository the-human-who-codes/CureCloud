import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarCheck,
  faFileMedical,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-line">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-poppins text-ink text-sm">{title}</p>
          <p className="font-poppins text-2xl font-bold text-primary">
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-primary text-xl" />
        </div>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.object.isRequired,
};

export default StatsCard;
