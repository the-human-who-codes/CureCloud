import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeartbeat,
  faWeight,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const HealthStatsCard = ({ statKey, value }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-poppins text-[#4a5568] text-sm">
          {statKey.replace(/([A-Z])/g, " $1").trim()}
        </p>
        <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
          {value}
        </p>
      </div>
      <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
        <FontAwesomeIcon
          icon={
            statKey === "bloodPressure"
              ? faHeart
              : statKey === "heartRate"
              ? faHeartbeat
              : statKey === "weight"
              ? faWeight
              : faTint
          }
          className="text-[#2c4ecf] text-xl"
        />
      </div>
    </div>
  </div>
);

HealthStatsCard.propTypes = {
  statKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default HealthStatsCard;
