import { useState } from "react";
import PropTypes from "prop-types";
import { faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import { labelFor } from "../../utils/format";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button, IconButton } from "../common/Button";
import { PractitionerPicker } from "../common/SearchPicker";

// The patient's care team (GET …/care-team). Doctors on the team and admins may add members
// (POST); only admins may remove them (DELETE), per patient:manage-care-team (§3.2).
function CareTeamPanel({ patient }) {
  const { user, can } = useAuth();
  const team = useApi(() => api.getCareTeam(patient.id), [patient.id]);
  const [adding, setAdding] = useState(false);
  const [pick, setPick] = useState(null);
  const manage = can("patient:manage-care-team");
  const mayAdd =
    manage && (user.role === "admin" || patient.careTeam?.includes(user.id));

  const add = useAction(async () => {
    const res = await api.addCareTeamMember(patient.id, pick.id);
    team.setData(res);
    setPick(null);
    setAdding(false);
  });
  const remove = useAction(async (userId) => {
    await api.removeCareTeamMember(patient.id, userId);
    team.setData({ data: team.data.data.filter((m) => m.id !== userId) });
  });
  const members = team.data?.data ?? [];

  return (
    <div className="space-y-3">
      <ErrorMessage error={add.error ?? remove.error} />
      <AsyncContent
        {...team}
        empty={members.length === 0}
        emptyText="No care team members yet."
      >
        <ul className="space-y-2">
          {members.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between bg-white rounded-lg p-3"
            >
              <div>
                <p className="font-poppins text-primary">{m.name}</p>
                <p className="font-poppins text-xs text-ink">
                  {[labelFor(m.role), m.specialization, m.departmentName]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              {manage && user.role === "admin" && (
                <IconButton
                  icon={faTrash}
                  title="Remove from care team"
                  className="text-red-500 hover:bg-red-50"
                  disabled={remove.busy}
                  onClick={() => remove.run(m.id)}
                />
              )}
            </li>
          ))}
        </ul>
      </AsyncContent>
      {mayAdd &&
        (adding ? (
          <div className="space-y-2">
            <PractitionerPicker
              label="Add a doctor or nurse"
              value={pick}
              onChange={setPick}
              facilityId={patient.facilityId ?? undefined}
              exclude={members.map((m) => m.id)}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={!pick || add.busy}
                onClick={() => add.run()}
              >
                Add
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAdding(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            icon={faUserPlus}
            onClick={() => setAdding(true)}
          >
            Add to care team
          </Button>
        ))}
    </div>
  );
}

CareTeamPanel.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facilityId: PropTypes.string,
    careTeam: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CareTeamPanel;
