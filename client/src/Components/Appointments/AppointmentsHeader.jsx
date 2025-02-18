import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AppointmentsHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
        Appointments
      </h1>
      <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Schedule Appointment
      </button>
    </div>
  );
}

export default AppointmentsHeader;
