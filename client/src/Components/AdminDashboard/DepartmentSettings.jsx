import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  faCalendarAlt,
  faHospital,
  faPercentage,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { api, listAll } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import {
  addDays,
  formatDate,
  formatDateTime,
  fromLocalInput,
  labelFor,
  sastInstant,
  todaySast,
} from "../../utils/format";
import { checks, validate } from "../../utils/validation";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatCard } from "../common/StatCard";
import StatusBadge from "../common/StatusBadge";
import { DataTable, Td } from "../common/TableHead";

const SHIFT_TYPES = [
  "morning",
  "afternoon",
  "night",
  "day",
  "on-call",
  "leave",
];
const percent = (rate) => (rate == null ? "—" : `${Math.round(rate * 100)}%`);

// Create (POST /departments) or edit (PATCH) a department. facilityId is fixed after create.
function DepartmentForm({ department, facilities, onClose, onSaved }) {
  const { isSystemAdmin } = useAuth();
  const [form, setForm] = useState({
    name: department?.name ?? "",
    facilityId: department?.facilityId ?? facilities[0]?.id ?? "",
    headId: department?.headId ?? "",
    location: department?.location ?? "",
    phone: department?.phone ?? "",
    bedCapacity: String(department?.bedCapacity ?? 0),
  });
  const [errors, setErrors] = useState({});
  // Head of department: an active doctor or nurse of the facility.
  const staff = useApi(
    () =>
      listAll(
        api.listUsers,
        {
          role: "doctor,nurse",
          status: "active",
          facilityId: isSystemAdmin ? form.facilityId || undefined : undefined,
        },
        300
      ),
    [form.facilityId]
  );

  const save = useAction(async () => {
    const opt = (v) => (v.trim() ? v.trim() : null);
    const body = {
      name: form.name.trim(),
      headId: form.headId || null,
      location: opt(form.location),
      phone: opt(form.phone),
      bedCapacity: Number(form.bedCapacity),
    };
    const saved = department
      ? await api.updateDepartment(department.id, body)
      : await api.createDepartment({
          ...body,
          ...(isSystemAdmin && { facilityId: form.facilityId }),
        });
    onSaved(saved);
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, {
      name: [
        (v) =>
          v.trim().length < 2 || v.trim().length > 120
            ? "2 to 120 characters"
            : null,
      ],
      location: checks.maxLength(200),
      phone: checks.phone,
      bedCapacity: [checks.required, checks.intRange(0, 10000)],
      facilityId: (v) =>
        isSystemAdmin && !department && !v ? "Choose a facility" : null,
    });
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <Modal
      title={department ? `Edit ${department.name}` : "New Department"}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="department-form" disabled={save.busy}>
            {save.busy ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <form
        id="department-form"
        onSubmit={submit}
        noValidate
        className="space-y-4"
      >
        <ErrorMessage error={save.error ?? staff.error} />
        {isSystemAdmin && !department && (
          <FormField
            as="select"
            label="Facility"
            value={form.facilityId}
            error={errors.facilityId}
            onChange={set("facilityId")}
          >
            <option value="">Choose a facility</option>
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </FormField>
        )}
        <FormField
          label="Name"
          value={form.name}
          maxLength={120}
          error={errors.name}
          onChange={set("name")}
        />
        <FormField
          as="select"
          label="Head of department"
          value={form.headId}
          onChange={set("headId")}
        >
          <option value="">None</option>
          {(staff.data ?? []).map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({labelFor(u.role)})
            </option>
          ))}
        </FormField>
        <FormField
          label="Location"
          value={form.location}
          maxLength={200}
          error={errors.location}
          onChange={set("location")}
          placeholder="Block A, Floor 2"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Phone"
            type="tel"
            value={form.phone}
            error={errors.phone}
            onChange={set("phone")}
          />
          <FormField
            label="Bed capacity"
            type="number"
            min={0}
            value={form.bedCapacity}
            error={errors.bedCapacity}
            hint="0 for an outpatient department"
            onChange={set("bedCapacity")}
          />
        </div>
      </form>
    </Modal>
  );
}

DepartmentForm.propTypes = {
  department: PropTypes.object,
  facilities: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

// The department's 7-day roster: the only place shifts are created and cancelled (§5.4).
function RosterPanel({ department, onClose }) {
  const [weekStart, setWeekStart] = useState(todaySast());
  const [form, setForm] = useState({
    staffId: "",
    type: "morning",
    start: "",
    end: "",
  });
  const [formError, setFormError] = useState(null);
  const shifts = useApi(
    () =>
      listAll(api.listShifts, {
        departmentId: department.id,
        from: sastInstant(weekStart),
        to: sastInstant(addDays(weekStart, 7)),
      }),
    [department.id, weekStart]
  );
  const staff = useApi(
    () =>
      listAll(api.listUsers, {
        departmentId: department.id,
        status: "active",
        role: "doctor,nurse",
      }),
    [department.id]
  );

  const add = useAction(async () => {
    await api.createShift({
      staffId: form.staffId,
      type: form.type,
      start: fromLocalInput(form.start),
      end: fromLocalInput(form.end),
      departmentId: department.id,
    });
    setForm({ ...form, start: "", end: "" });
    shifts.reload();
  });
  const cancel = useAction(async (id) => {
    await api.updateShift(id, { status: "cancelled" });
    shifts.reload();
  });

  const submit = (e) => {
    e.preventDefault();
    setFormError(null);
    const start = Date.parse(fromLocalInput(form.start));
    const end = Date.parse(fromLocalInput(form.end));
    if (!form.staffId) return setFormError("Choose a staff member.");
    if (!form.start || !form.end)
      return setFormError("Enter a start and an end.");
    if (end <= start) return setFormError("The end must be after the start.");
    if (end - start > 24 * 3600e3)
      return setFormError("A shift is at most 24 hours long.");
    add.run();
  };
  const addError =
    add.error?.code === "conflict"
      ? { message: "This overlaps an existing shift for that staff member." }
      : add.error;
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <Modal title={`Roster — ${department.name}`} onClose={onClose} size="xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setWeekStart(addDays(weekStart, -7))}
          >
            Previous week
          </Button>
          <p className="font-poppins text-primary">
            {formatDate(weekStart)} – {formatDate(addDays(weekStart, 6))}
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setWeekStart(addDays(weekStart, 7))}
          >
            Next week
          </Button>
        </div>
        <ErrorMessage error={cancel.error} />
        <AsyncContent
          {...shifts}
          empty={shifts.data?.length === 0}
          emptyText="No shifts this week."
        >
          <DataTable columns={["Staff", "Type", "Start", "End", "Status", ""]}>
            {(shifts.data ?? []).map((s) => (
              <tr key={s.id}>
                <Td>
                  {s.staffName}
                  <span className="block text-xs">{labelFor(s.staffRole)}</span>
                </Td>
                <Td>{labelFor(s.type)}</Td>
                <Td className="text-sm">{formatDateTime(s.start)}</Td>
                <Td className="text-sm">{formatDateTime(s.end)}</Td>
                <Td>
                  <StatusBadge status={s.status} />
                </Td>
                <Td>
                  {s.status === "scheduled" && (
                    <Button
                      size="sm"
                      variant="danger"
                      disabled={cancel.busy}
                      onClick={() => cancel.run(s.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </Td>
              </tr>
            ))}
          </DataTable>
        </AsyncContent>

        <form
          onSubmit={submit}
          noValidate
          className="bg-surface rounded-xl p-4 space-y-4"
        >
          <h3 className="font-poppins font-semibold text-primary">Add shift</h3>
          <ErrorMessage error={addError ?? staff.error} />
          {formError && <ErrorMessage error={{ message: formError }} />}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              compact
              as="select"
              label="Staff member"
              value={form.staffId}
              onChange={set("staffId")}
            >
              <option value="">Choose…</option>
              {(staff.data ?? []).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({labelFor(u.role)})
                </option>
              ))}
            </FormField>
            <FormField
              compact
              as="select"
              label="Type"
              value={form.type}
              onChange={set("type")}
            >
              {SHIFT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {labelFor(t)}
                </option>
              ))}
            </FormField>
            <FormField
              compact
              label="Start"
              type="datetime-local"
              value={form.start}
              onChange={set("start")}
            />
            <FormField
              compact
              label="End"
              type="datetime-local"
              value={form.end}
              onChange={set("end")}
            />
          </div>
          <Button type="submit" size="sm" icon={faPlus} disabled={add.busy}>
            Add shift
          </Button>
          {(staff.data ?? []).length === 0 && !staff.loading && (
            <p className="font-poppins text-xs text-ink">
              No active staff in this department yet.{" "}
              <Link
                to={`/admin/user-management?departmentId=${department.id}`}
                className="text-primary underline"
              >
                Assign staff
              </Link>
            </p>
          )}
        </form>
      </div>
    </Modal>
  );
}

RosterPanel.propTypes = {
  department: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

function DepartmentSettings() {
  const { isSystemAdmin } = useAuth();
  const [dialog, setDialog] = useState(null);
  const departments = useApi(() =>
    listAll(api.listDepartments, { include: "stats" })
  );
  const facilities = useApi(() =>
    isSystemAdmin
      ? listAll(api.listFacilities, { status: "active" })
      : Promise.resolve([])
  );
  const archive = useAction(async (d, status) => {
    const saved = await api.updateDepartment(d.id, { status });
    replace({ ...saved, stats: d.stats });
  });

  const replace = (d) =>
    departments.setData(
      (departments.data ?? []).some((x) => x.id === d.id)
        ? departments.data.map((x) => (x.id === d.id ? { ...x, ...d } : x))
        : [...(departments.data ?? []), d]
    );

  const list = departments.data ?? [];
  const active = list.filter((d) => d.status === "active");
  const rates = active
    .map((d) => d.stats?.occupancyRate)
    .filter((r) => r != null);
  const facilityName = (id) => facilities.data?.find((f) => f.id === id)?.name;

  return (
    <PageShell>
      <PageHeader
        title="Department Settings"
        actions={
          <Button icon={faPlus} onClick={() => setDialog({ type: "edit" })}>
            New Department
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Active Departments"
          value={active.length}
          icon={faHospital}
        />
        <StatCard
          label="Staff"
          value={active.reduce((sum, d) => sum + (d.stats?.staff ?? 0), 0)}
          icon={faUsers}
        />
        <StatCard
          label="Average Occupancy"
          value={
            rates.length
              ? percent(rates.reduce((a, b) => a + b, 0) / rates.length)
              : "—"
          }
          icon={faPercentage}
        />
      </div>
      <ErrorMessage error={archive.error} className="mb-4" />
      <AsyncContent
        {...departments}
        empty={list.length === 0}
        emptyText="No departments yet. Create the first one."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {list.map((d) => (
            <Card key={d.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-primary">
                    {d.name}
                  </h3>
                  <p className="font-poppins text-sm text-ink">
                    {[isSystemAdmin && facilityName(d.facilityId), d.location]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 font-poppins text-sm mb-4">
                <div>
                  <p className="text-ink-muted text-xs">Head</p>
                  <p className="text-primary">{d.headName ?? "—"}</p>
                </div>
                <div>
                  <p className="text-ink-muted text-xs">Staff</p>
                  <p className="text-primary">
                    {d.stats
                      ? `${d.stats.staff} (${d.stats.doctors} doctors, ${d.stats.nurses} nurses)`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted text-xs">Admitted / beds</p>
                  <p className="text-primary">
                    {d.stats?.admittedPatients ?? "—"} / {d.bedCapacity}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted text-xs">Occupancy</p>
                  <p className="text-primary">
                    {d.bedCapacity === 0
                      ? "Outpatient"
                      : percent(d.stats?.occupancyRate)}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted text-xs">Appointments today</p>
                  <p className="text-primary">
                    {d.stats?.appointmentsToday ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted text-xs">Phone</p>
                  <p className="text-primary">{d.phone ?? "—"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setDialog({ type: "edit", department: d })}
                >
                  Edit
                </Button>
                {d.status === "active" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={faCalendarAlt}
                    onClick={() => setDialog({ type: "roster", department: d })}
                  >
                    Roster
                  </Button>
                )}
                <Link
                  to={`/admin/user-management?departmentId=${d.id}`}
                  className="px-3 py-1.5 text-sm rounded-lg font-poppins bg-surface text-primary hover:bg-line"
                >
                  Assign staff
                </Link>
                <Button
                  size="sm"
                  variant={d.status === "active" ? "danger" : "secondary"}
                  disabled={archive.busy}
                  onClick={() =>
                    archive.run(
                      d,
                      d.status === "active" ? "archived" : "active"
                    )
                  }
                >
                  {d.status === "active" ? "Archive" : "Restore"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </AsyncContent>
      {dialog?.type === "edit" && (
        <DepartmentForm
          department={dialog.department}
          facilities={facilities.data ?? []}
          onClose={() => setDialog(null)}
          onSaved={(d) =>
            dialog.department ? replace(d) : departments.reload()
          }
        />
      )}
      {dialog?.type === "roster" && (
        <RosterPanel
          department={dialog.department}
          onClose={() => setDialog(null)}
        />
      )}
    </PageShell>
  );
}

export default DepartmentSettings;
