import PropTypes from "prop-types";
import { Card, SectionTitle } from "../common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStickyNote } from "@fortawesome/free-solid-svg-icons";

const ShiftInfoSection = ({ shiftInfo }) => (
  <Card className="hover:shadow-md transition-shadow">
    <SectionTitle className="flex items-center gap-2">
      <FontAwesomeIcon icon={faCalendarAlt} className="text-primary" />
      Shift Information
    </SectionTitle>
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-700">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-primary" />
        <p className="font-medium">{shiftInfo.currentShift}</p>
      </div>
      <div className="flex items-start gap-2 text-gray-700">
        <FontAwesomeIcon icon={faStickyNote} className="text-primary mt-1" />
        <p className="leading-relaxed">{shiftInfo.handoverNotes}</p>
      </div>
    </div>
  </Card>
);

ShiftInfoSection.propTypes = {
  shiftInfo: PropTypes.shape({
    currentShift: PropTypes.string.isRequired,
    handoverNotes: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShiftInfoSection;
