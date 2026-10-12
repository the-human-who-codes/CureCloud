import PropTypes from "prop-types";
import { ageFromDob, labelFor } from "../../utils/format";
import { admissionLabel } from "../../utils/patients";
import InitialsAvatar from "../common/InitialsAvatar";
import StatusBadge from "../common/StatusBadge";
import { DataTable, Td } from "../common/TableHead";

// Shared patient list (doctor Patient Records, admin Patients). Clinical callers also see acuity;
// `actions(patient)` renders the last column.
function PatientTable({ patients, showAcuity = false, actions }) {
  const columns = [
    "Patient",
    "Folder",
    showAcuity && "Acuity",
    "Admission",
    "Status",
    actions && "Actions",
  ].filter(Boolean);
  return (
    <DataTable columns={columns}>
      {patients.map((p) => (
        <tr key={p.id} className="hover:bg-surface">
          <Td>
            <div className="flex items-center gap-3">
              <InitialsAvatar name={p.name} />
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-sm">
                  {ageFromDob(p.birthDate) ?? "—"} yrs • {labelFor(p.sex)}
                </p>
              </div>
            </div>
          </Td>
          <Td>{p.folderNumber ?? "—"}</Td>
          {showAcuity && (
            <Td>{p.acuity ? <StatusBadge status={p.acuity} /> : "—"}</Td>
          )}
          <Td className="text-sm">
            {admissionLabel(p.admission) ?? "Not admitted"}
          </Td>
          <Td>
            <StatusBadge status={p.status} />
          </Td>
          {actions && <Td>{actions(p)}</Td>}
        </tr>
      ))}
    </DataTable>
  );
}

PatientTable.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object).isRequired,
  showAcuity: PropTypes.bool,
  actions: PropTypes.func,
};

export default PatientTable;
