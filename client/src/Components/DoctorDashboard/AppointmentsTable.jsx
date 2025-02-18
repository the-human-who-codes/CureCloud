import PropTypes from "prop-types";

const AppointmentsTable = ({ appointments }) => {
  return (
    <div>
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Upcoming Appointments
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f8faff]">
            <tr>
              {["Patient Name", "Time", "Type", "Status"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map(({ id, patientName, time, type, status }) => (
              <tr key={id} className="border-t border-[#e1e8ff]">
                <td className="px-6 py-4 font-poppins text-[#4a5568]">
                  {patientName}
                </td>
                <td className="px-6 py-4 font-poppins text-[#4a5568]">
                  {time}
                </td>
                <td className="px-6 py-4 font-poppins text-[#4a5568]">
                  {type}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-poppins ${
                      status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AppointmentsTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      patientName: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppointmentsTable;
