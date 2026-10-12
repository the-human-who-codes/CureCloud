import { useState } from "react";
import PropTypes from "prop-types";
import { api, listAll } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import { checks, validate } from "../../utils/validation";
import { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";

const RULES = {
  departmentId: checks.required,
  ward: checks.maxLength(60),
  room: checks.maxLength(30),
  bed: checks.maxLength(30),
};

// Admits a patient (POST …/admission) or moves them (PATCH …/admission). Nurses may only change
// the ward, room and bed within their department; doctors and admins may also transfer.
function AdmissionForm({ patient, onClose, onSaved }) {
  const { user, isSystemAdmin } = useAuth();
  const current = patient.admission;
  const nurse = user.role === "nurse";
  const [form, setForm] = useState({
    departmentId: current?.departmentId ?? "",
    ward: current?.ward ?? "",
    room: current?.room ?? "",
    bed: current?.bed ?? "",
  });
  const [errors, setErrors] = useState({});
  const departments = useApi(
    () =>
      nurse
        ? Promise.resolve([])
        : listAll(api.listDepartments, {
            // Everyone but system admins only sees their own facility's departments.
            facilityId: isSystemAdmin
              ? patient.facilityId ?? undefined
              : undefined,
            status: "active",
          }),
    [patient.facilityId]
  );

  const save = useAction(async () => {
    const opt = (v) => (v.trim() ? v.trim() : null);
    const location = {
      ward: opt(form.ward),
      room: opt(form.room),
      bed: opt(form.bed),
    };
    const saved = current
      ? await api.updateAdmission(patient.id, {
          ...location,
          ...(!nurse &&
            form.departmentId !== current.departmentId && {
              departmentId: form.departmentId,
            }),
        })
      : await api.admitPatient(patient.id, {
          departmentId: form.departmentId,
          ...Object.fromEntries(
            Object.entries(location).filter(([, v]) => v !== null)
          ),
        });
    onSaved(saved);
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(
      form,
      nurse ? { ...RULES, departmentId: () => null } : RULES
    );
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <Modal
      title={current ? "Update admission" : `Admit ${patient.name}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="admission-form" disabled={save.busy}>
            {save.busy ? "Saving…" : current ? "Save" : "Admit"}
          </Button>
        </>
      }
    >
      <form
        id="admission-form"
        onSubmit={submit}
        noValidate
        className="space-y-4"
      >
        <ErrorMessage error={save.error ?? departments.error} />
        {nurse ? (
          <p className="font-poppins text-sm text-ink">
            Department: {current?.departmentName}
          </p>
        ) : (
          <FormField
            as="select"
            label="Department"
            value={form.departmentId}
            error={errors.departmentId}
            onChange={set("departmentId")}
          >
            <option value="">Choose a department</option>
            {(departments.data ?? []).map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </FormField>
        )}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="Ward"
            value={form.ward}
            maxLength={60}
            error={errors.ward}
            onChange={set("ward")}
          />
          <FormField
            label="Room"
            value={form.room}
            maxLength={30}
            error={errors.room}
            onChange={set("room")}
          />
          <FormField
            label="Bed"
            value={form.bed}
            maxLength={30}
            error={errors.bed}
            onChange={set("bed")}
          />
        </div>
      </form>
    </Modal>
  );
}

AdmissionForm.propTypes = {
  patient: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default AdmissionForm;
