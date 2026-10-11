import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Card, SectionTitle } from "../common/Card";
const ScheduleOverview = ({ profileData }) => {
  return (
    <Card>
      <SectionTitle spacing="lg">
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        Schedule Overview
      </SectionTitle>
      <div className="space-y-6">
        <div>
          <p className="font-poppins text-sm text-ink">Working Hours</p>
          <p className="font-poppins text-lg">
            {profileData.schedule.workingHours}
          </p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Available Time Slots</p>
          {profileData.schedule.availableSlots.map((slot, index) => (
            <p key={index} className="font-poppins text-lg mt-2">
              {slot}
            </p>
          ))}
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">
            Preferred Appointment Duration
          </p>
          <p className="font-poppins text-lg">
            {profileData.schedule.appointmentDuration}
          </p>
        </div>
      </div>
    </Card>
  );
};

ScheduleOverview.propTypes = {
  profileData: PropTypes.shape({
    schedule: PropTypes.shape({
      workingHours: PropTypes.string.isRequired,
      availableSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
      appointmentDuration: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ScheduleOverview;
