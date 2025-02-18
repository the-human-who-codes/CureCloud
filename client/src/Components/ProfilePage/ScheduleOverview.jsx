import PropTypes from "prop-types";

const ScheduleOverview = ({ profileData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
        <i className="fas fa-clock mr-2"></i>Schedule Overview
      </h2>
      <div className="space-y-6">
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Working Hours</p>
          <p className="font-poppins text-lg">
            {profileData.schedule.workingHours}
          </p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">
            Available Time Slots
          </p>
          {profileData.schedule.availableSlots.map((slot, index) => (
            <p key={index} className="font-poppins text-lg mt-2">
              {slot}
            </p>
          ))}
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">
            Preferred Appointment Duration
          </p>
          <p className="font-poppins text-lg">
            {profileData.schedule.appointmentDuration}
          </p>
        </div>
      </div>
    </div>
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
