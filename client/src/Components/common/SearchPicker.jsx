import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { ageFromDob, labelFor } from "../../utils/format";
import { IconButton } from "./Button";
import { FormField } from "./FormField";

// Type-ahead picker over a name-prefix search endpoint (?q=). `search(q)` returns a page;
// `describe(item)` gives the secondary line. Shows the chosen item with a clear button.
export function SearchPicker({
  label,
  value,
  onChange,
  search,
  describe = () => null,
  placeholder = "Type a name…",
  error,
  exclude = [],
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [failure, setFailure] = useState(null);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return undefined;
    }
    let live = true;
    const timer = setTimeout(async () => {
      try {
        const page = await search(term);
        if (live) {
          setResults(page.data);
          setFailure(null);
        }
      } catch (err) {
        if (live) setFailure(err.message);
      }
    }, 250);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [q, search]);

  if (value)
    return (
      <div>
        <p className="block font-poppins text-sm text-ink mb-2">{label}</p>
        <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-line bg-surface">
          <div>
            <p className="font-poppins text-primary">{value.name}</p>
            {describe(value) && (
              <p className="font-poppins text-xs text-ink">{describe(value)}</p>
            )}
          </div>
          <IconButton
            icon={faTimes}
            title="Change"
            onClick={() => onChange(null)}
          />
        </div>
      </div>
    );

  const shown = results.filter((r) => !exclude.includes(r.id));
  return (
    <div className="relative">
      <FormField
        label={label}
        type="search"
        value={q}
        maxLength={60}
        placeholder={placeholder}
        onChange={(e) => setQ(e.target.value)}
        error={error ?? failure ?? undefined}
      />
      {q.trim() && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-line rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {shown.length === 0 ? (
            <li className="px-4 py-2 font-poppins text-sm text-ink">
              No matches.
            </li>
          ) : (
            shown.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-surface"
                  onClick={() => {
                    onChange(item);
                    setQ("");
                  }}
                >
                  <span className="font-poppins text-primary">{item.name}</span>
                  {describe(item) && (
                    <span className="block font-poppins text-xs text-ink">
                      {describe(item)}
                    </span>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

SearchPicker.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  describe: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  exclude: PropTypes.arrayOf(PropTypes.string),
};

const searchPatients = (q) => api.listPatients({ q, limit: 10 });
const describePatient = (p) =>
  [
    p.folderNumber && `Folder ${p.folderNumber}`,
    ageFromDob(p.birthDate) != null && `${ageFromDob(p.birthDate)} yrs`,
    p.sex && labelFor(p.sex),
  ]
    .filter(Boolean)
    .join(" · ");

// Patient picker over GET /patients?q= (only the caller's accessible patients).
export function PatientPicker(props) {
  return (
    <SearchPicker
      label="Patient"
      search={searchPatients}
      describe={describePatient}
      {...props}
    />
  );
}

PatientPicker.propTypes = { label: PropTypes.node };

const describePractitioner = (p) =>
  [labelFor(p.role), p.specialization, p.departmentName]
    .filter(Boolean)
    .join(" · ");

// Doctor / nurse picker over GET /practitioners?q= (active staff only).
export function PractitionerPicker({ role, facilityId, ...props }) {
  const [search] = useState(
    () => (q) => api.listPractitioners({ q, role, facilityId, limit: 10 })
  );
  return (
    <SearchPicker
      label="Staff member"
      search={search}
      describe={describePractitioner}
      {...props}
    />
  );
}

PractitionerPicker.propTypes = {
  role: PropTypes.oneOf(["doctor", "nurse"]),
  facilityId: PropTypes.string,
  label: PropTypes.node,
};
