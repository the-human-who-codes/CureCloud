import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import {
  APPOINTMENT_TYPES,
  DURATIONS,
  bookableDates,
  candidateSlots,
} from "../../utils/appointments";
import {
  addDays,
  formatDate,
  formatTime,
  labelFor,
  sastInstant,
} from "../../utils/format";
import { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PatientPicker } from "../common/SearchPicker";

// Book (POST /appointments) or reschedule (PATCH start/durationMinutes) an appointment. Candidate
// slots are the doctor's free time within opening hours (GET /practitioners/{id}/busy).
function BookingForm({ appointment, onClose, onSaved }) {
  const { user } = useAuth();
  const rescheduling = Boolean(appointment);
  const settings = useApi(() => api.getSystemSettings());
  // Patients choose any active doctor; doctors book themselves; nurses and admins choose.
  const doctors = useApi(
    () =>
      user.role === "doctor" || rescheduling
        ? Promise.resolve({ data: [] })
        : api.listPractitioners({ role: "doctor", limit: 100 }),
    []
  );

  const [patient, setPatient] = useState(null);
  const [doctorId, setDoctorId] = useState(
    appointment?.doctorId ?? (user.role === "doctor" ? user.id : "")
  );
  const [date, setDate] = useState("");
  const [durationMinutes, setDuration] = useState(
    appointment?.durationMinutes ?? null
  );
  const [start, setStart] = useState("");
  const [type, setType] = useState("check-up");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState({ data: [], loading: false });
  const [formError, setFormError] = useState(null);

  const duration =
    durationMinutes ?? settings.data?.appointments.defaultDurationMinutes ?? 30;
  const dates = settings.data ? bookableDates(settings.data) : [];

  // Busy intervals for the chosen doctor and day.
  const loadBusy = async () => {
    if (!doctorId || !date) return setBusy({ data: [], loading: false });
    setBusy({ data: [], loading: true });
    try {
      const res = await api.getPractitionerBusy(doctorId, {
        from: sastInstant(date),
        to: sastInstant(addDays(date, 1)),
      });
      setBusy({ data: res.data, loading: false });
    } catch (error) {
      setBusy({ data: [], loading: false, error });
    }
  };
  useEffect(() => {
    setStart("");
    loadBusy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId, date]);

  const slots =
    date && settings.data
      ? candidateSlots({
          date,
          settings: settings.data,
          busy: busy.data,
          durationMinutes: duration,
        })
      : [];

  const save = useAction(async () => {
    const result = rescheduling
      ? await api.updateAppointment(appointment.id, {
          start,
          durationMinutes: duration,
        })
      : await api.bookAppointment({
          doctorId,
          start,
          durationMinutes: duration,
          type,
          ...(user.role !== "patient" && { patientId: patient?.id }),
          ...(reason.trim() && { reason: reason.trim() }),
        });
    onSaved(result);
    onClose();
  });

  const submit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (user.role !== "patient" && !rescheduling && !patient)
      return setFormError("Choose a patient.");
    if (!doctorId) return setFormError("Choose a doctor.");
    if (!start) return setFormError("Choose a date and time.");
    if (reason.length > 1000)
      return setFormError("The reason can be at most 1000 characters.");
    await save.run();
  };

  // A slot taken in the meantime: show the fresh availability.
  useEffect(() => {
    if (save.error?.code === "slot-unavailable") loadBusy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save.error]);

  return (
    <Modal
      title={rescheduling ? "Reschedule Appointment" : "Book Appointment"}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="booking-form" disabled={save.busy}>
            {save.busy ? "Saving…" : rescheduling ? "Reschedule" : "Book"}
          </Button>
        </>
      }
    >
      <form id="booking-form" onSubmit={submit} className="space-y-4">
        <ErrorMessage error={save.error ?? settings.error ?? doctors.error} />
        {formError && <ErrorMessage error={{ message: formError }} />}
        {rescheduling && (
          <p className="font-poppins text-sm text-ink">
            {appointment.patientName} with {appointment.doctorName}
          </p>
        )}
        {user.role !== "patient" && !rescheduling && (
          <PatientPicker value={patient} onChange={setPatient} />
        )}
        {user.role !== "doctor" && !rescheduling && (
          <FormField
            as="select"
            label="Doctor"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          >
            <option value="">Choose a doctor</option>
            {(doctors.data?.data ?? []).map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
                {d.specialization ? ` — ${d.specialization}` : ""}
                {d.facilityName ? ` (${d.facilityName})` : ""}
              </option>
            ))}
          </FormField>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            as="select"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="">Choose a date</option>
            {dates.map((d) => (
              <option key={d} value={d}>
                {formatDate(d)}
              </option>
            ))}
          </FormField>
          <FormField
            as="select"
            label="Duration"
            value={duration}
            onChange={(e) => {
              setDuration(Number(e.target.value));
              setStart("");
            }}
          >
            {DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d} minutes
              </option>
            ))}
          </FormField>
        </div>
        <FormField
          as="select"
          label="Time"
          value={start}
          disabled={!date || busy.loading}
          onChange={(e) => setStart(e.target.value)}
          hint={
            date && !busy.loading && slots.length === 0
              ? "No free times on this day."
              : undefined
          }
          error={busy.error?.message}
        >
          <option value="">
            {busy.loading ? "Loading free times…" : "Choose a time"}
          </option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {formatTime(s)}
            </option>
          ))}
        </FormField>
        {!rescheduling && (
          <>
            <FormField
              as="select"
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {APPOINTMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {labelFor(t)}
                </option>
              ))}
            </FormField>
            <FormField
              as="textarea"
              rows={3}
              label="Reason for the visit (optional)"
              value={reason}
              maxLength={1000}
              onChange={(e) => setReason(e.target.value)}
            />
          </>
        )}
      </form>
    </Modal>
  );
}

BookingForm.propTypes = {
  appointment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default BookingForm;
