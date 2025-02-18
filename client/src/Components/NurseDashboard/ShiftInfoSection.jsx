import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStickyNote } from "@fortawesome/free-solid-svg-icons";

const ShiftInfoSection = ({ shiftInfo }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff] hover:shadow-md transition-shadow">
    <h2 className="text-xl font-semibold text-[#2c4ecf] mb-4 flex items-center gap-2">
      <FontAwesomeIcon icon={faCalendarAlt} className="text-[#2c4ecf]" />
      Shift Information
    </h2>
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-700">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-[#2c4ecf]" />
        <p className="font-medium">{shiftInfo.currentShift}</p>
      </div>
      <div className="flex items-start gap-2 text-gray-700">
        <FontAwesomeIcon icon={faStickyNote} className="text-[#2c4ecf] mt-1" />
        <p className="leading-relaxed">{shiftInfo.handoverNotes}</p>
      </div>
    </div>
  </div>
);

ShiftInfoSection.propTypes = {
  shiftInfo: PropTypes.shape({
    currentShift: PropTypes.string.isRequired,
    handoverNotes: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShiftInfoSection;
