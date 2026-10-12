import {
  faHeartbeat,
  faPills,
  faNotesMedical,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "../common/Card";
import { ActionList } from "../common/QuickActions";

const ACTIONS = [
  {
    name: "Record Vitals",
    icon: faHeartbeat,
    iconClassName: "text-blue-600",
    to: "/nurse/my-patients",
  },
  {
    name: "Administer Medication",
    icon: faPills,
    iconClassName: "text-green-600",
    to: "/nurse/medications",
  },
  {
    name: "Update Notes",
    icon: faNotesMedical,
    iconClassName: "text-yellow-600",
    to: "/nurse/my-patients",
  },
  {
    name: "Tasks",
    icon: faTasks,
    iconClassName: "text-purple-600",
    to: "/nurse/tasks",
  },
];

const QuickActionsSection = () => (
  <Card title="Quick Actions">
    <ActionList actions={ACTIONS} />
  </Card>
);

export default QuickActionsSection;
