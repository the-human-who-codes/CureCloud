import { useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction } from "../../hooks/useApi";
import { appointmentActions } from "../../utils/appointments";
import { Button } from "../common/Button";
import ReasonModal from "../common/ReasonModal";
import BookingForm from "./BookingForm";

// Status buttons for one appointment (confirm, check in, complete, no-show, cancel, reschedule),
// shown only when the transition is allowed for the signed-in user (§2.7).
function AppointmentActions({ appointment, settings, onChanged }) {
  const { user } = useAuth();
  const [dialog, setDialog] = useState(null);
  const allowed = appointmentActions(appointment, user, settings);
  const transition = useAction(async (status) =>
    onChanged(await api.updateAppointment(appointment.id, { status }))
  );

  const buttons = [
    allowed.confirm && ["Confirm", () => transition.run("confirmed")],
    allowed.checkIn && ["Check in", () => transition.run("checked-in")],
    allowed.complete && ["Complete", () => transition.run("completed")],
    allowed.noShow && ["No-show", () => transition.run("no-show")],
    allowed.reschedule && ["Reschedule", () => setDialog("reschedule")],
    allowed.cancel && ["Cancel", () => setDialog("cancel")],
  ].filter(Boolean);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {buttons.map(([label, onClick]) => (
          <Button
            key={label}
            size="sm"
            variant={label === "Cancel" ? "danger" : "secondary"}
            disabled={transition.busy}
            onClick={onClick}
          >
            {label}
          </Button>
        ))}
      </div>
      {transition.error && (
        <p className="mt-1 font-poppins text-xs text-red-600">
          {transition.error.message}
        </p>
      )}
      {dialog === "cancel" && (
        <ReasonModal
          title="Cancel appointment"
          label="Cancellation reason"
          confirmLabel="Cancel appointment"
          onClose={() => setDialog(null)}
          onSubmit={async (cancellationReason) =>
            onChanged(
              await api.updateAppointment(appointment.id, {
                status: "cancelled",
                cancellationReason,
              })
            )
          }
        />
      )}
      {dialog === "reschedule" && (
        <BookingForm
          appointment={appointment}
          onClose={() => setDialog(null)}
          onSaved={onChanged}
        />
      )}
    </div>
  );
}

AppointmentActions.propTypes = {
  appointment: PropTypes.object.isRequired,
  settings: PropTypes.object,
  onChanged: PropTypes.func.isRequired,
};

export default AppointmentActions;
