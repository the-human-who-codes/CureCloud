import PropTypes from "prop-types";
import { capitalize } from "../../utils/format";

const AppointmentsTable = ({ appointments }) => {
  return (
    <div>
      <h2 className="font-poppins text-xl font-semibold text-primary mb-4">
        Upcoming Appointments
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              {["Patient Name", "Time", "Type", "Status"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 font-poppins text-sm text-ink text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map(
              ({ id, patientName, date, time, type, status }) => (
                <tr key={id} className="border-t border-line">
                  <td className="px-6 py-4 font-poppins text-ink">
                    {patientName}
                  </td>
                  <td className="px-6 py-4 font-poppins text-ink">
                    {date} {time}
                  </td>
                  <td className="px-6 py-4 font-poppins text-ink">{type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-poppins ${
                        status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {capitalize(status)}
                    </span>
                  </td>
                </tr>
              )
            )}
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
