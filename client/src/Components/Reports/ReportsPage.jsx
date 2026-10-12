import { useState } from "react";
import PropTypes from "prop-types";
import {
  faCalendarCheck,
  faDownload,
  faPrescription,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { api, listAll } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import {
  addDays,
  downloadCsv,
  formatDate,
  formatDateTime,
  labelFor,
  sastInstant,
  todaySast,
} from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { FilterSelect } from "../common/FormField";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatCard } from "../common/StatCard";
import { DataTable, Td } from "../common/TableHead";

const PERIODS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "365", label: "Last 12 months" },
];

// Admin clinical aggregates hide small cells (1–4) as null (§2.18).
const cell = (v) => (v === null ? "<5" : v);

// Horizontal bars for a { label: count } distribution.
export function BarList({ entries }) {
  const max = Math.max(1, ...entries.map(([, v]) => v ?? 0));
  if (!entries.length)
    return <p className="font-poppins text-sm text-ink">No data.</p>;
  return (
    <ul className="space-y-2">
      {entries.map(([label, value]) => (
        <li key={label} className="font-poppins text-sm">
          <div className="flex justify-between text-ink">
            <span>{label}</span>
            <span className="font-medium text-primary">{cell(value)}</span>
          </div>
          <div className="h-2 bg-surface rounded-full mt-1">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${((value ?? 2) / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

BarList.propTypes = { entries: PropTypes.array.isRequired };

const labelled = (record) =>
  Object.entries(record ?? {}).map(([k, v]) => [labelFor(k), v]);

// Report summary -> CSV rows (section, item, value).
function toCsv(r) {
  const rows = [["Section", "Item", "Value"]];
  const add = (section, entries) =>
    entries.forEach(([k, v]) => rows.push([section, k, cell(v)]));
  add("Period", [
    ["From", r.period.from],
    ["To", r.period.to],
  ]);
  add("Patients", [
    ["Total", r.patients.total],
    ["New in period", r.patients.newInPeriod],
  ]);
  add("Patients by sex", labelled(r.patients.bySex));
  add("Patients by age group", Object.entries(r.patients.byAgeGroup));
  add("Patients by acuity", labelled(r.patients.byAcuity));
  add(
    "Top conditions",
    r.patients.topConditions.map((c) => [`${c.category} ${c.name}`, c.count])
  );
  add("Appointments", [["Total", r.appointments.total]]);
  add("Appointments by status", labelled(r.appointments.byStatus));
  add("Appointments by type", labelled(r.appointments.byType));
  add(
    "Appointments by day",
    r.appointments.byDay.map((d) => [d.date, d.count])
  );
  if (r.prescriptions) {
    add("Prescriptions", [
      ["Active", r.prescriptions.active],
      ["New in period", r.prescriptions.newInPeriod],
    ]);
    add(
      "Top medications",
      r.prescriptions.topMedications.map((m) => [m.name, m.count])
    );
  }
  (r.departments ?? []).forEach((d) =>
    add(`Department ${d.name}`, [
      ["Staff", d.staff],
      ["Admitted patients", d.admittedPatients],
      ["Bed capacity", d.bedCapacity],
      ["Occupancy", d.occupancyRate],
      ["Appointments", d.appointments],
    ])
  );
  return rows;
}

const SCOPE_LABELS = {
  practitioner: "Your patients and appointments",
  department: "Your department and care-team patients",
  facility: "Your facility",
  system: "All facilities",
};

// One role-aware reports page for doctors, nurses and admins (GET /reports/summary).
function ReportsPage() {
  const { user, isSystemAdmin } = useAuth();
  const admin = user.role === "admin";
  const [days, setDays] = useState("30");
  const [departmentId, setDepartmentId] = useState("");
  const [facilityId, setFacilityId] = useState("");

  const facilities = useApi(
    () => (isSystemAdmin ? listAll(api.listFacilities) : Promise.resolve([])),
    [isSystemAdmin]
  );
  const departments = useApi(
    () =>
      admin && (!isSystemAdmin || facilityId)
        ? listAll(api.listDepartments, { facilityId: facilityId || undefined })
        : Promise.resolve([]),
    [admin, facilityId]
  );
  const report = useApi(
    () =>
      api.getReportSummary({
        from: sastInstant(addDays(todaySast(), -Number(days) + 1)),
        to: new Date().toISOString(),
        ...(admin && departmentId && { departmentId }),
        ...(isSystemAdmin && facilityId && { facilityId }),
      }),
    [days, departmentId, facilityId]
  );
  const r = report.data;

  return (
    <PageShell>
      <PageHeader
        title="Reports"
        subtitle={r ? SCOPE_LABELS[r.scope.type] : undefined}
        actions={
          <Button
            icon={faDownload}
            disabled={!r}
            onClick={() =>
              downloadCsv(`curecloud-report-${todaySast()}.csv`, toCsv(r))
            }
          >
            Export CSV
          </Button>
        }
      />
      <div className="flex flex-wrap gap-4 mb-8">
        <FilterSelect
          label="Period"
          value={days}
          onChange={setDays}
          options={PERIODS}
        />
        {isSystemAdmin && (
          <FilterSelect
            label="Facility"
            value={facilityId}
            onChange={(v) => {
              setFacilityId(v);
              setDepartmentId("");
            }}
            options={[
              { value: "", label: "All facilities" },
              ...(facilities.data ?? []).map((f) => ({
                value: f.id,
                label: f.name,
              })),
            ]}
          />
        )}
        {admin && (departments.data ?? []).length > 0 && (
          <FilterSelect
            label="Department"
            value={departmentId}
            onChange={setDepartmentId}
            options={[
              { value: "", label: "All departments" },
              ...departments.data.map((d) => ({ value: d.id, label: d.name })),
            ]}
          />
        )}
      </div>

      <AsyncContent loading={report.loading} error={report.error}>
        {r && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                label="Patients"
                value={r.patients.total}
                icon={faUsers}
              />
              <StatCard
                label="New Patients"
                value={r.patients.newInPeriod}
                icon={faUserPlus}
              />
              <StatCard
                label="Appointments"
                value={r.appointments.total}
                icon={faCalendarCheck}
              />
              {r.prescriptions && (
                <StatCard
                  label="Active Prescriptions"
                  value={r.prescriptions.active}
                  icon={faPrescription}
                />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card title="Patients by sex" titleSize="lg">
                <BarList entries={labelled(r.patients.bySex)} />
              </Card>
              <Card title="Patients by age group" titleSize="lg">
                <BarList entries={Object.entries(r.patients.byAgeGroup)} />
              </Card>
              <Card title="Patients by acuity" titleSize="lg">
                <BarList entries={labelled(r.patients.byAcuity)} />
              </Card>
              <Card title="Appointments by status" titleSize="lg">
                <BarList entries={labelled(r.appointments.byStatus)} />
              </Card>
              <Card title="Appointments by type" titleSize="lg">
                <BarList entries={labelled(r.appointments.byType)} />
              </Card>
              <Card title="Appointments by hour" titleSize="lg">
                <BarList
                  entries={r.appointments.byHour.map((h) => [
                    `${String(h.hour).padStart(2, "0")}:00`,
                    h.count,
                  ])}
                />
              </Card>
              <Card title="Top conditions" titleSize="lg">
                <BarList
                  entries={r.patients.topConditions.map((c) => [
                    `${c.name} (${c.category})`,
                    c.count,
                  ])}
                />
              </Card>
              {r.prescriptions && (
                <Card title="Top medications" titleSize="lg">
                  <BarList
                    entries={r.prescriptions.topMedications.map((m) => [
                      m.name,
                      m.count,
                    ])}
                  />
                </Card>
              )}
              <Card title="Appointments by day" titleSize="lg">
                <BarList
                  entries={r.appointments.byDay.map((d) => [
                    formatDate(d.date),
                    d.count,
                  ])}
                />
              </Card>
            </div>

            {r.departments && (
              <Card title="Departments" padded={false}>
                <DataTable
                  columns={[
                    "Department",
                    "Staff",
                    "Admitted",
                    "Beds",
                    "Occupancy",
                    "Appointments",
                  ]}
                >
                  {r.departments.map((d) => (
                    <tr key={d.departmentId}>
                      <Td className="font-medium text-primary">{d.name}</Td>
                      <Td>{d.staff}</Td>
                      <Td>{d.admittedPatients}</Td>
                      <Td>{d.bedCapacity}</Td>
                      <Td>
                        {d.occupancyRate == null
                          ? "Outpatient"
                          : `${Math.round(d.occupancyRate * 100)}%`}
                      </Td>
                      <Td>{d.appointments}</Td>
                    </tr>
                  ))}
                </DataTable>
              </Card>
            )}
            <p className="font-poppins text-xs text-ink">
              Generated {formatDateTime(r.meta.generatedAt)}
              {r.meta.truncated &&
                " · Based on the first 2,000 records of each kind; totals may be incomplete."}
              {admin &&
                " · Counts from 1 to 4 are shown as <5 to protect privacy."}
            </p>
          </div>
        )}
      </AsyncContent>
    </PageShell>
  );
}

export default ReportsPage;
