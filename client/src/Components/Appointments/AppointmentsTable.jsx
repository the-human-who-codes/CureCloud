import PropTypes from "prop-types";
import { formatDateTime, labelFor } from "../../utils/format";
import { DataTable, Td } from "../common/TableHead";
import StatusBadge from "../common/StatusBadge";
import AppointmentActions from "./AppointmentActions";

// Appointments list used by the appointments page and the doctor dashboard. The Doctor column
// and the per-row actions are optional; `onChanged(updated)` enables the actions.
function AppointmentsTable({
  appointments,
  showDoctor = true,
  settings,
  onChanged,
}) {
  const columns = [
    "Patient",
    showDoctor && "Doctor",
    "Date & Time",
    "Type",
    "Status",
    onChanged && "Actions",
  ].filter(Boolean);

  return (
    <DataTable columns={columns}>
      {appointments.map((appointment) => (
        <tr key={appointment.id}>
          <Td>{appointment.patientName}</Td>
          {showDoctor && <Td>{appointment.doctorName}</Td>}
          <Td>
            {formatDateTime(appointment.start)}
            <span className="block text-xs">
              {appointment.durationMinutes} min
            </span>
          </Td>
          <Td>
            {labelFor(appointment.type)}
            {appointment.reason && (
              <span className="block text-xs max-w-xs truncate">
                {appointment.reason}
              </span>
            )}
          </Td>
          <Td>
            <StatusBadge status={appointment.status} />
          </Td>
          {onChanged && (
            <Td>
              <AppointmentActions
                appointment={appointment}
                settings={settings}
                onChanged={onChanged}
              />
            </Td>
          )}
        </tr>
      ))}
    </DataTable>
  );
}

AppointmentsTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      patientName: PropTypes.string.isRequired,
      doctorName: PropTypes.string,
      start: PropTypes.string.isRequired,
      durationMinutes: PropTypes.number,
      type: PropTypes.string.isRequired,
      reason: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  showDoctor: PropTypes.bool,
  settings: PropTypes.object,
  onChanged: PropTypes.func,
};

export default AppointmentsTable;
