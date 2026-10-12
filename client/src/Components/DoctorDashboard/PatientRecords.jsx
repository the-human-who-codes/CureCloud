import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { usePagedApi } from "../../hooks/useApi";
import { labelFor } from "../../utils/format";
import { ACUITIES } from "../../utils/patients";
import AsyncContent, { LoadMore } from "../common/AsyncContent";
import { Button, IconButton } from "../common/Button";
import { Card } from "../common/Card";
import { FilterSelect, FormField } from "../common/FormField";
import { PageHeader, PageShell } from "../common/PageShell";
import PatientDetail from "../Patients/PatientDetail";
import PatientForm from "../Patients/PatientForm";
import PatientTable from "../Patients/PatientTable";

// The doctor's patients (care team or ward): name search and acuity filter run on the server.
function PatientRecords() {
  const { can } = useAuth();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [search, setSearch] = useState(q);
  const [acuity, setAcuity] = useState("all");
  const selectedId = params.get("patient");
  const creating = params.get("new") === "1";

  useEffect(() => setSearch(q), [q]);

  const patients = usePagedApi(
    (cursor) =>
      api.listPatients({
        q: q || undefined,
        // The API combines the name search with acuity but not the other way round (§2.19).
        acuity: acuity === "all" ? undefined : acuity,
        cursor,
      }),
    [q, acuity]
  );

  const setParam = (key, value) =>
    setParams((p) => {
      const next = new URLSearchParams(p);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });

  const replace = (updated) =>
    patients.setItems((items) =>
      items.some((p) => p.id === updated.id)
        ? items.map((p) => (p.id === updated.id ? updated : p))
        : [updated, ...items]
    );

  return (
    <PageShell>
      <PageHeader
        title="Patient Records"
        subtitle="Patients on your care team or in your ward"
        actions={
          can("patient:create") && (
            <Button icon={faPlus} onClick={() => setParam("new", "1")}>
              Add New Patient
            </Button>
          )
        }
      />

      <Card className="mb-6">
        <form
          className="flex flex-wrap items-end gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setParam("q", search.trim());
          }}
        >
          <FormField
            compact
            label="Search by name"
            type="search"
            value={search}
            maxLength={60}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1 min-w-[200px]"
          />
          <FilterSelect
            label="Acuity"
            value={acuity}
            onChange={setAcuity}
            options={[
              { value: "all", label: "All patients" },
              ...ACUITIES.map((a) => ({ value: a, label: labelFor(a) })),
            ]}
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
      </Card>

      <AsyncContent
        loading={patients.loading}
        error={patients.error}
        empty={patients.items.length === 0}
        emptyText={
          q
            ? "No patients match this search."
            : "No patients on your care team yet."
        }
      >
        <Card padded={false}>
          <PatientTable
            patients={patients.items}
            showAcuity
            actions={(p) => (
              <IconButton
                icon={faEye}
                title="View details"
                className="text-primary hover:bg-line"
                onClick={() => setParam("patient", p.id)}
              />
            )}
          />
          <LoadMore {...patients} />
        </Card>
      </AsyncContent>

      {selectedId && (
        <PatientDetail
          patientId={selectedId}
          onClose={() => setParam("patient", null)}
          onChanged={replace}
        />
      )}
      {creating && (
        <PatientForm
          onClose={() => setParam("new", null)}
          onSaved={(p) => {
            replace(p);
            setParam("patient", p.id);
          }}
        />
      )}
    </PageShell>
  );
}

export default PatientRecords;
