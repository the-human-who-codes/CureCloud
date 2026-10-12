import {
  faCalendarPlus,
  faPrescriptionBottle,
  faFileMedical,
  faCommentMedical,
  faHeart,
  faHeartbeat,
  faWeight,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import {
  formatDateTime,
  healthStatsFromVitals,
  longDate,
} from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import { Card, Section } from "../common/Card";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatGrid } from "../common/StatCard";
import { ActionList } from "../common/QuickActions";

import { UpcomingAppointmentsList } from "./UpcomingAppointmentsCard";
import { PrescriptionsList } from "./PatientPrescriptions";
import NotificationCard from "./NotificationCard";

const VITAL_ICONS = {
  bloodPressure: faHeart,
  heartRate: faHeartbeat,
  weight: faWeight,
  bloodGlucose: faTint,
};
const VITAL_LABELS = {
  bloodPressure: "Blood Pressure",
  heartRate: "Heart Rate",
  weight: "Weight",
  bloodGlucose: "Blood Glucose",
};

const QUICK_ACTIONS = [
  {
    name: "Book Appointment",
    icon: faCalendarPlus,
    to: "/patient/appointments",
  },
  {
    name: "Request Prescription Refill",
    icon: faPrescriptionBottle,
    to: "/patient/prescriptions",
  },
  {
    name: "View Medical Records",
    icon: faFileMedical,
    to: "/patient/medical-records",
  },
  {
    name: "Message My Care Team",
    icon: faCommentMedical,
    to: "/patient/messages",
  },
];

function PatientDashBoard() {
  const { user, patient } = useAuth();
  const appointments = useApi(() =>
    api.listAppointments({ from: new Date().toISOString(), limit: 5 })
  );
  const prescriptions = useApi(() =>
    api.listPrescriptions({ status: "active", limit: 10 })
  );
  const notifications = useApi(() =>
    api.listNotifications({ unread: true, limit: 5 })
  );
  const vitals = patient?.latestVitals;

  return (
    <PageShell>
      <PageHeader
        title={`Welcome back, ${user?.name ?? ""}`}
        subtitle={longDate()}
      />

      <StatGrid
        stats={healthStatsFromVitals(vitals)}
        icons={VITAL_ICONS}
        label={(key) => VITAL_LABELS[key]}
      />
      {vitals?.recordedAt && (
        <p className="-mt-6 mb-8 font-poppins text-xs text-ink">
          Latest readings from {formatDateTime(vitals.recordedAt)}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingAppointmentsList appointments={appointments} />
            <PrescriptionsList prescriptions={prescriptions} />
          </div>
        </div>

        <div>
          <Section title="Quick Actions">
            <Card>
              <ActionList actions={QUICK_ACTIONS} />
            </Card>
          </Section>

          <Card title="Notifications" className="mt-6">
            <div className="space-y-4">
              <AsyncContent
                {...notifications}
                empty={notifications.data?.data.length === 0}
                emptyText="You're all caught up."
              >
                {notifications.data?.data.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </AsyncContent>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

export default PatientDashBoard;
