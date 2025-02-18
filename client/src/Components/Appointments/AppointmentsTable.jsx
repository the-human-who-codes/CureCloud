import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function AppointmentsTable({ appointments }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#f8faff]">
          <tr>
            <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
              Patient
            </th>
            <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
              Doctor
            </th>
            <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
              Date & Time
            </th>
            <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
              Type
            </th>
            <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
              Status
            </th>
            <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-t border-[#e1e8ff]">
              <td className="px-6 py-4 flex items-center">
                <img
                  src={appointment.patientImage}
                  alt={appointment.patientName}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="font-poppins text-[#4a5568]">
                  {appointment.patientName}
                </span>
              </td>
              <td className="px-6 py-4 font-poppins text-[#4a5568]">
                {appointment.doctorName}
              </td>
              <td className="px-6 py-4 font-poppins text-[#4a5568]">
                {appointment.date} {appointment.time}
              </td>
              <td className="px-6 py-4 font-poppins text-[#4a5568]">
                {appointment.type}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-poppins ${
                    appointment.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

AppointmentsTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      patientImage: PropTypes.string.isRequired,
      patientName: PropTypes.string.isRequired,
      doctorName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppointmentsTable;
