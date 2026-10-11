import {
  faHeartbeat,
  faPills,
  faNotesMedical,
  faUserMd,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "../common/Card";
import { ActionList } from "../common/QuickActions";

const ACTIONS = [
  { name: "Record Vitals", icon: faHeartbeat, iconClassName: "text-blue-600" },
  {
    name: "Administer Medication",
    icon: faPills,
    iconClassName: "text-green-600",
  },
  {
    name: "Update Notes",
    icon: faNotesMedical,
    iconClassName: "text-yellow-600",
  },
  { name: "Request Doctor", icon: faUserMd, iconClassName: "text-purple-600" },
  {
    name: "Emergency Alert",
    icon: faExclamationTriangle,
    iconClassName: "text-red-600",
  },
];

const QuickActionsSection = () => (
  <Card title="Quick Actions">
    <ActionList actions={ACTIONS} />
  </Card>
);

export default QuickActionsSection;
