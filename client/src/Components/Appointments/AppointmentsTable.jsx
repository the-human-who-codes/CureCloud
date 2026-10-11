import PropTypes from "prop-types";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import TableHead from "../common/TableHead";
import StatusBadge from "../common/StatusBadge";
import { IconButton } from "../common/Button";

const cell = "px-6 py-4 font-poppins text-ink";

// Appointments list used by the appointments page and the doctor dashboard.
// The Doctor column and the confirm/cancel actions are optional.
function AppointmentsTable({
  appointments,
  showDoctor = true,
  onConfirm,
  onCancel,
}) {
  const showActions = Boolean(onConfirm || onCancel);
  const columns = [
    "Patient",
    showDoctor && "Doctor",
    "Date & Time",
    "Type",
    "Status",
    showActions && "Actions",
  ].filter(Boolean);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHead columns={columns} />
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-t border-line">
              <td className={cell}>
                <div className="flex items-center">
                  {appointment.patientImage && (
                    <img
                      src={appointment.patientImage}
                      alt={appointment.patientName}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  )}
                  {appointment.patientName}
                </div>
              </td>
              {showDoctor && <td className={cell}>{appointment.doctorName}</td>}
              <td className={cell}>
                {appointment.date} {appointment.time}
              </td>
              <td className={cell}>{appointment.type}</td>
              <td className="px-6 py-4">
                <StatusBadge status={appointment.status} />
              </td>
              {showActions && (
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {onConfirm && appointment.status === "pending" && (
                      <IconButton
                        icon={faCheck}
                        title="Confirm"
                        onClick={() => onConfirm(appointment.id)}
                        className="text-green-600 hover:bg-surface"
                      />
                    )}
                    {onCancel &&
                      ["pending", "confirmed"].includes(appointment.status) && (
                        <IconButton
                          icon={faTimes}
                          title="Cancel"
                          onClick={() => onCancel(appointment.id)}
                          className="text-red-500 hover:bg-surface"
                        />
                      )}
                  </div>
                </td>
              )}
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
      patientImage: PropTypes.string,
      patientName: PropTypes.string.isRequired,
      doctorName: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  showDoctor: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AppointmentsTable;
