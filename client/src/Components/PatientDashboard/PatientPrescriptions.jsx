import { useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useApi, usePagedApi } from "../../hooks/useApi";
import { isCurrent } from "../../utils/prescriptions";
import AsyncContent, { LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { PageHeader, PageShell } from "../common/PageShell";
import ReasonModal from "../common/ReasonModal";
import PrescriptionsCard from "./PrescriptionsCard";

// Card listing a useApi() result of prescriptions ({ data }), used on the patient dashboard.
export function PrescriptionsList({ prescriptions }) {
  return (
    <Card title="Current Prescriptions">
      <div className="space-y-4">
        <AsyncContent
          {...prescriptions}
          empty={prescriptions.data?.data.length === 0}
          emptyText="No active prescriptions."
        >
          {prescriptions.data?.data.map((prescription) => (
            <PrescriptionsCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </AsyncContent>
      </div>
    </Card>
  );
}

PrescriptionsList.propTypes = {
  prescriptions: PropTypes.object.isRequired,
};

// "Request refill" for current outpatient prescriptions with refills left; it notifies the prescriber.
function RefillButton({ prescription }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  if (
    prescription.category !== "outpatient" ||
    prescription.refills <= 0 ||
    !isCurrent(prescription)
  )
    return null;
  if (sent)
    return (
      <p className="font-poppins text-sm text-green-700">
        Refill requested. Your prescriber has been notified.
      </p>
    );
  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        Request refill
      </Button>
      {open && (
        <ReasonModal
          title={`Request a refill of ${prescription.medication}`}
          label="Note for your prescriber (optional)"
          confirmLabel="Send request"
          required={false}
          maxLength={500}
          onClose={() => setOpen(false)}
          onSubmit={async (note) => {
            await api.requestRefill(prescription.id, note);
            setSent(true);
          }}
        />
      )}
    </>
  );
}

RefillButton.propTypes = { prescription: PropTypes.object.isRequired };

const PatientPrescriptions = () => {
  const active = useApi(() =>
    api.listPrescriptions({ status: "active,on-hold", limit: 100 })
  );
  const history = usePagedApi((cursor) =>
    api.listPrescriptions({ status: "completed,stopped", cursor })
  );

  return (
    <PageShell>
      <PageHeader title="My Prescriptions" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Current">
          <div className="space-y-4">
            <AsyncContent
              {...active}
              empty={active.data?.data.length === 0}
              emptyText="No current prescriptions."
            >
              {active.data?.data.map((rx) => (
                <PrescriptionsCard key={rx.id} prescription={rx}>
                  <RefillButton prescription={rx} />
                </PrescriptionsCard>
              ))}
            </AsyncContent>
          </div>
        </Card>
        <Card title="History">
          <div className="space-y-4">
            <AsyncContent
              loading={history.loading}
              error={history.error}
              empty={history.items.length === 0}
              emptyText="No past prescriptions."
            >
              {history.items.map((rx) => (
                <PrescriptionsCard key={rx.id} prescription={rx} />
              ))}
              <LoadMore {...history} />
            </AsyncContent>
          </div>
        </Card>
      </div>
    </PageShell>
  );
};

export default PatientPrescriptions;
