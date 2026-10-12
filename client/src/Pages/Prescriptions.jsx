import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthProvider";
import { useAction, usePagedApi } from "../hooks/useApi";
import { formatDate, labelFor } from "../utils/format";
import { PRESCRIPTION_STATUSES, frequencyLabel } from "../utils/prescriptions";
import AsyncContent, { LoadMore } from "../Components/common/AsyncContent";
import { Button } from "../Components/common/Button";
import { Card } from "../Components/common/Card";
import { FilterSelect } from "../Components/common/FormField";
import { PageHeader, PageShell } from "../Components/common/PageShell";
import ReasonModal from "../Components/common/ReasonModal";
import StatusBadge from "../Components/common/StatusBadge";
import { DataTable, Td } from "../Components/common/TableHead";
import PrescriptionForm from "../Components/Prescriptions/PrescriptionForm";

// Hold / resume / stop / edit / entered-in-error for one prescription (transitions in §2.8).
function PrescriptionActions({ prescription, onChanged }) {
  const { user } = useAuth();
  const [dialog, setDialog] = useState(null);
  const resume = useAction(async () =>
    onChanged(
      await api.updatePrescription(prescription.id, { status: "active" })
    )
  );
  const { status } = prescription;
  const open = status === "active" || status === "on-hold";
  const prescriber = prescription.prescriberId === user.id;
  const setStatus = (next) => async (statusReason) =>
    onChanged(
      await api.updatePrescription(prescription.id, {
        status: next,
        statusReason,
      })
    );

  if (!open) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {status === "active" && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setDialog("on-hold")}
        >
          Hold
        </Button>
      )}
      {status === "on-hold" && (
        <Button
          size="sm"
          variant="secondary"
          disabled={resume.busy}
          onClick={() => resume.run()}
        >
          Resume
        </Button>
      )}
      <Button size="sm" variant="secondary" onClick={() => setDialog("edit")}>
        Edit
      </Button>
      <Button size="sm" variant="danger" onClick={() => setDialog("stopped")}>
        Stop
      </Button>
      {prescriber && (
        <Button
          size="sm"
          variant="danger"
          onClick={() => setDialog("entered-in-error")}
        >
          Entered in error
        </Button>
      )}
      {resume.error && (
        <p className="font-poppins text-xs text-red-600">
          {resume.error.message}
        </p>
      )}
      {dialog === "edit" && (
        <PrescriptionForm
          prescription={prescription}
          onClose={() => setDialog(null)}
          onSaved={onChanged}
        />
      )}
      {["on-hold", "stopped", "entered-in-error"].includes(dialog) && (
        <ReasonModal
          title={`${
            dialog === "on-hold"
              ? "Hold"
              : dialog === "stopped"
              ? "Stop"
              : "Retract"
          } ${prescription.medication}`}
          confirmLabel={labelFor(dialog)}
          onClose={() => setDialog(null)}
          onSubmit={setStatus(dialog)}
        />
      )}
    </div>
  );
}

PrescriptionActions.propTypes = {
  prescription: PropTypes.object.isRequired,
  onChanged: PropTypes.func.isRequired,
};

// The prescriber's own prescriptions (GET /prescriptions?prescriberId=me).
function Prescriptions() {
  const { can } = useAuth();
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState("active,on-hold");
  const creating = params.get("new") === "1";
  const prescriptions = usePagedApi(
    (cursor) =>
      api.listPrescriptions({
        prescriberId: "me",
        status: status === "all" ? undefined : status,
        cursor,
      }),
    [status]
  );

  const replace = (rx) =>
    prescriptions.setItems((items) =>
      items.some((x) => x.id === rx.id)
        ? items.map((x) => (x.id === rx.id ? rx : x))
        : [rx, ...items]
    );

  return (
    <PageShell>
      <PageHeader
        title="Prescriptions"
        subtitle="Medication you have prescribed"
        actions={
          can("prescription:create") && (
            <Button icon={faPlus} onClick={() => setParams({ new: "1" })}>
              New Prescription
            </Button>
          )
        }
      />
      <div className="mb-6 flex">
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "active,on-hold", label: "Current (active or on hold)" },
            { value: "all", label: "All" },
            ...PRESCRIPTION_STATUSES.map((s) => ({
              value: s,
              label: labelFor(s),
            })),
          ]}
        />
      </div>
      <AsyncContent
        loading={prescriptions.loading}
        error={prescriptions.error}
        empty={prescriptions.items.length === 0}
        emptyText="No prescriptions match this filter."
      >
        <Card padded={false}>
          <DataTable
            columns={[
              "Patient",
              "Medication",
              "Frequency",
              "Dates",
              "Refills",
              "Status",
              "Actions",
            ]}
          >
            {prescriptions.items.map((rx) => (
              <tr key={rx.id}>
                <Td>
                  {rx.patientName}
                  <span className="block text-xs">{labelFor(rx.category)}</span>
                </Td>
                <Td>
                  <span className="font-medium text-primary">
                    {rx.medication}
                  </span>
                  <span className="block text-sm">
                    {rx.dose} · {labelFor(rx.route)}
                  </span>
                </Td>
                <Td className="text-sm">
                  {frequencyLabel(rx)}
                  {rx.administrationTimes?.length > 0 && (
                    <span className="block text-xs">
                      {rx.administrationTimes.join(", ")}
                    </span>
                  )}
                </Td>
                <Td className="text-sm">
                  {formatDate(rx.startDate)}
                  {rx.endDate && ` – ${formatDate(rx.endDate)}`}
                </Td>
                <Td>{rx.refills}</Td>
                <Td>
                  <StatusBadge status={rx.status} />
                  {rx.statusReason && (
                    <span className="block text-xs mt-1">
                      {rx.statusReason}
                    </span>
                  )}
                </Td>
                <Td>
                  <PrescriptionActions prescription={rx} onChanged={replace} />
                </Td>
              </tr>
            ))}
          </DataTable>
          <LoadMore {...prescriptions} />
        </Card>
      </AsyncContent>
      {creating && (
        <PrescriptionForm onClose={() => setParams({})} onSaved={replace} />
      )}
    </PageShell>
  );
}

export default Prescriptions;
