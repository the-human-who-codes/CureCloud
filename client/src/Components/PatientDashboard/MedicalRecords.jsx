import { useState } from "react";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi, usePagedApi } from "../../hooks/useApi";
import { formatDate, formatDateTime, labelFor } from "../../utils/format";
import { RECORD_CATEGORIES } from "../../utils/patients";
import AsyncContent, { LoadMore } from "../common/AsyncContent";
import { Card, SectionTitle } from "../common/Card";
import { FilterSelect } from "../common/FormField";
import InitialsAvatar from "../common/InitialsAvatar";
import { PageShell } from "../common/PageShell";
import Tabs from "../common/Tabs";
import AllergyList from "../Clinical/AllergyList";
import RecordCard from "../Clinical/RecordCard";
import VitalsGrid from "../Clinical/VitalsGrid";
import PrescriptionsCard from "./PrescriptionsCard";
import AppointmentCard from "./AppointmentCard";

const TABS = [
  { value: "summary", label: "Summary" },
  { value: "records", label: "Records" },
  { value: "visits", label: "Visits" },
  { value: "medications", label: "Medications" },
];

function MedicalRecords() {
  const [activeTab, setActiveTab] = useState("summary");
  const [category, setCategory] = useState("all");
  const { user, patient } = useAuth();

  // The two most recent panels give the trend arrows.
  const vitals = useApi(
    () =>
      patient
        ? api.listVitals(patient.id, { limit: 2 })
        : Promise.resolve({ data: [] }),
    [patient?.id]
  );
  const prescriptions = useApi(() =>
    api.listPrescriptions({ status: "active", limit: 50 })
  );
  const visits = usePagedApi((cursor) =>
    api.listAppointments({
      to: new Date().toISOString(),
      status: "completed",
      cursor,
    })
  );
  const records = usePagedApi(
    (cursor) =>
      api.listMedicalRecords({
        category: category === "all" ? undefined : category,
        cursor,
      }),
    [category]
  );

  const [latest, previous] = vitals.data?.data ?? [];

  return (
    <PageShell>
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <InitialsAvatar
            name={patient?.name}
            photoUrl={user?.photoUrl ?? undefined}
            large
          />
          <div className="flex-1">
            <h1 className="font-poppins text-2xl font-bold text-primary">
              {patient?.name}
            </h1>
            <p className="font-poppins text-ink">
              {[
                patient?.folderNumber && `Folder ${patient.folderNumber}`,
                `Born ${formatDate(patient?.birthDate)}`,
                patient?.bloodType && `Blood type ${patient.bloodType}`,
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="font-poppins text-sm text-ink-muted mb-1">
              Allergies
            </p>
            <AllergyList
              allergies={patient?.allergies}
              noKnownAllergies={patient?.noKnownAllergies}
            />
          </div>
          <div>
            <p className="font-poppins text-sm text-ink-muted mb-1">
              Chronic conditions
            </p>
            {patient?.chronicConditions?.length ? (
              <ul className="font-poppins text-sm text-ink space-y-1">
                {patient.chronicConditions.map((c) => (
                  <li key={c.name}>
                    {c.name}
                    {c.code ? ` (${c.code})` : ""}
                    {c.since ? ` · since ${formatDate(c.since)}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-poppins text-sm text-ink">None recorded</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <AsyncContent loading={vitals.loading} error={vitals.error}>
            <VitalsGrid
              vitals={latest}
              previous={previous ?? null}
              keys={[
                "temperature",
                "bloodPressure",
                "heartRate",
                "oxygenSaturation",
              ]}
            />
            {latest && (
              <p className="mt-2 font-poppins text-xs text-ink">
                Recorded {formatDateTime(latest.recordedAt)} by{" "}
                {latest.createdByName}
              </p>
            )}
          </AsyncContent>
        </div>
      </Card>

      <Card padded={false}>
        <Tabs tabs={TABS} value={activeTab} onChange={setActiveTab} />
        <div className="p-6 space-y-4">
          {activeTab === "summary" && (
            <>
              <SectionTitle size="lg">Latest records</SectionTitle>
              <AsyncContent
                loading={records.loading}
                error={records.error}
                empty={records.items.length === 0}
                emptyText="No records yet."
              >
                {records.items.slice(0, 3).map((r) => (
                  <RecordCard key={r.id} record={r} />
                ))}
              </AsyncContent>
            </>
          )}

          {activeTab === "records" && (
            <>
              <FilterSelect
                label="Category"
                value={category}
                onChange={setCategory}
                className="max-w-xs"
                options={[
                  { value: "all", label: "All categories" },
                  ...RECORD_CATEGORIES.map((c) => ({
                    value: c,
                    label: labelFor(c),
                  })),
                ]}
              />
              <AsyncContent
                loading={records.loading}
                error={records.error}
                empty={records.items.length === 0}
                emptyText="No records in this category."
              >
                {records.items.map((r) => (
                  <RecordCard key={r.id} record={r} />
                ))}
                <LoadMore {...records} />
              </AsyncContent>
            </>
          )}

          {activeTab === "visits" && (
            <AsyncContent
              loading={visits.loading}
              error={visits.error}
              empty={visits.items.length === 0}
              emptyText="No completed visits yet."
            >
              {visits.items.map((v) => (
                <AppointmentCard key={v.id} appointment={v} />
              ))}
              <LoadMore {...visits} />
            </AsyncContent>
          )}

          {activeTab === "medications" && (
            <AsyncContent
              {...prescriptions}
              empty={prescriptions.data?.data.length === 0}
              emptyText="No active medications."
            >
              {prescriptions.data?.data.map((rx) => (
                <PrescriptionsCard key={rx.id} prescription={rx} />
              ))}
            </AsyncContent>
          )}
        </div>
      </Card>
    </PageShell>
  );
}

export default MedicalRecords;
