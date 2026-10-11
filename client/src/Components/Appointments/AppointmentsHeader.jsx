import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PageHeader } from "../common/PageShell";
import { Button } from "../common/Button";

function AppointmentsHeader() {
  return (
    <PageHeader
      title="Appointments"
      actions={<Button icon={faPlus}>Schedule Appointment</Button>}
    />
  );
}

export default AppointmentsHeader;
