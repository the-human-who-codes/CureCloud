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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-poppins text-[#4a5568] text-sm">{title}</p>
          <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-[#2c4ecf] text-xl" />
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
