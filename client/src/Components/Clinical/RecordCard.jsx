import PropTypes from "prop-types";
import { formatDateTime, labelFor } from "../../utils/format";
import StatusBadge from "../common/StatusBadge";
import { DataTable, Td } from "../common/TableHead";

const SECTIONS = [
  ["diagnosis", "Diagnosis"],
  ["findings", "Findings"],
  ["treatment", "Treatment"],
  ["recommendations", "Recommendations"],
];

// One medical record: content sections, lab results and addenda. `children` holds actions.
function RecordCard({ record, children }) {
  return (
    <div className="p-4 bg-surface rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-poppins font-semibold text-primary">
            {record.title}
          </h4>
          <p className="font-poppins text-xs text-ink">
            {labelFor(record.category)} · {formatDateTime(record.effectiveAt)} ·{" "}
            {record.authorName}
          </p>
        </div>
        <StatusBadge status={record.status} size="sm" />
      </div>
      {record.statusReason && (
        <p className="mt-2 font-poppins text-xs text-red-700">
          {record.statusReason}
        </p>
      )}
      <div className="mt-3 space-y-2">
        {SECTIONS.filter(([key]) => record[key]).map(([key, label]) => (
          <div key={key}>
            <p className="font-poppins text-xs text-ink-muted">
              {label}
              {key === "diagnosis" && record.diagnosisCode
                ? ` (${record.diagnosisCode})`
                : ""}
            </p>
            <p className="font-poppins text-sm text-ink whitespace-pre-line">
              {record[key]}
            </p>
          </div>
        ))}
      </div>
      {record.labResults?.length > 0 && (
        <div className="mt-3 bg-white rounded-lg">
          <DataTable columns={["Test", "Result", "Reference", "Flag"]}>
            {record.labResults.map((lab, i) => (
              <tr key={`${lab.name}-${i}`}>
                <Td className="text-sm">{lab.name}</Td>
                <Td className="text-sm">
                  {lab.value} {lab.unit}
                </Td>
                <Td className="text-sm">{lab.referenceRange ?? "—"}</Td>
                <Td>
                  <StatusBadge status={lab.flag} size="sm" />
                </Td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}
      {record.addenda?.length > 0 && (
        <div className="mt-3 space-y-2 border-l-2 border-line pl-3">
          {record.addenda.map((a) => (
            <div key={a.createdAt}>
              <p className="font-poppins text-xs text-ink-muted">
                Addendum · {a.authorName} · {formatDateTime(a.createdAt)}
              </p>
              <p className="font-poppins text-sm text-ink whitespace-pre-line">
                {a.text}
              </p>
            </div>
          ))}
        </div>
      )}
      {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default RecordCard;
