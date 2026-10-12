import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, usePagedApi } from "../../hooks/useApi";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PageHeader, PageShell } from "../common/PageShell";
import ReasonModal from "../common/ReasonModal";
import AdmissionForm from "../Patients/AdmissionForm";
import CareTeamPanel from "../Patients/CareTeamPanel";
import PatientForm from "../Patients/PatientForm";
import PatientTable from "../Patients/PatientTable";

// Reception and records view for administrative access: register walk-ins, edit demographics,
// deactivate, manage admission and the care team. No clinical fields are shown (§5.4).
function AdminPatients() {
  const { can } = useAuth();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [search, setSearch] = useState(q);
  const [dialog, setDialog] = useState(null);
  useEffect(() => setSearch(q), [q]);

  const patients = usePagedApi(
    (cursor) => api.listPatients({ q: q || undefined, cursor }),
    [q]
  );
  const replace = (p) =>
    patients.setItems((items) =>
      items.some((x) => x.id === p.id)
        ? items.map((x) => (x.id === p.id ? p : x))
        : [p, ...items]
    );
  const discharge = useAction(async (patient, note) =>
    replace(
      await api.dischargePatient(
        patient.id,
        note ? { dischargeNote: note } : {}
      )
    )
  );

  return (
    <PageShell>
      <PageHeader
        title="Patients"
        subtitle="Registration, demographics, admissions and care teams"
        actions={
          can("patient:create") && (
            <Button icon={faPlus} onClick={() => setDialog({ type: "create" })}>
              Register Patient
            </Button>
          )
        }
      />
      <Card className="mb-6">
        <form
          className="flex items-end gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setParams(search.trim() ? { q: search.trim() } : {});
          }}
        >
          <FormField
            compact
            label="Search by name"
            type="search"
            value={search}
            maxLength={60}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1"
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
      </Card>
      <ErrorMessage error={discharge.error} className="mb-4" />
      <AsyncContent
        loading={patients.loading}
        error={patients.error}
        empty={patients.items.length === 0}
        emptyText={
          q
            ? "No patients match this search."
            : "No patients registered in your facility yet."
        }
      >
        <Card padded={false}>
          <PatientTable
            patients={patients.items}
            actions={(p) => (
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setDialog({ type: "edit", patient: p })}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setDialog({ type: "team", patient: p })}
                >
                  Care team
                </Button>
                {can("patient:admit") && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setDialog({ type: "admission", patient: p })}
                  >
                    {p.admission ? "Move" : "Admit"}
                  </Button>
                )}
                {p.admission && can("patient:admit") && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setDialog({ type: "discharge", patient: p })}
                  >
                    Discharge
                  </Button>
                )}
              </div>
            )}
          />
          <LoadMore {...patients} />
        </Card>
      </AsyncContent>

      {dialog?.type === "create" && (
        <PatientForm onClose={() => setDialog(null)} onSaved={replace} />
      )}
      {dialog?.type === "edit" && (
        <PatientForm
          patient={dialog.patient}
          onClose={() => setDialog(null)}
          onSaved={replace}
        />
      )}
      {dialog?.type === "admission" && (
        <AdmissionForm
          patient={dialog.patient}
          onClose={() => setDialog(null)}
          onSaved={replace}
        />
      )}
      {dialog?.type === "discharge" && (
        <ReasonModal
          title={`Discharge ${dialog.patient.name}`}
          label="Discharge note (optional)"
          confirmLabel="Discharge"
          required={false}
          maxLength={2000}
          onClose={() => setDialog(null)}
          onSubmit={(note) => discharge.run(dialog.patient, note)}
        />
      )}
      {dialog?.type === "team" && (
        <Modal
          title={`Care team — ${dialog.patient.name}`}
          onClose={() => setDialog(null)}
        >
          <CareTeamPanel patient={dialog.patient} />
        </Modal>
      )}
    </PageShell>
  );
}

export default AdminPatients;
