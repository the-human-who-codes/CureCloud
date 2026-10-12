import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faStickyNote,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAction } from "../../hooks/useApi";
import { formatDateTime, formatTime, labelFor } from "../../utils/format";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card, SectionTitle } from "../common/Card";
import { FormField } from "../common/FormField";

// GET /shifts/current: the caller's shift, the previous handover note and who is on duty, plus
// an editor for the caller's own handover note (PATCH /shifts/{id}).
const ShiftInfoSection = ({ current }) => {
  const shift = current.data?.shift;
  const [note, setNote] = useState(null);
  const save = useAction(async () => {
    const saved = await api.updateShift(shift.id, {
      handoverNote: note.trim(),
    });
    current.setData({ ...current.data, shift: saved });
    setNote(null);
  });
  const handover = current.data?.previousHandover;
  const onDuty = current.data?.onDuty ?? [];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <SectionTitle className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-primary" />
        Shift Information
      </SectionTitle>
      <AsyncContent loading={current.loading} error={current.error}>
        <div className="space-y-4 font-poppins">
          <p className="font-medium text-gray-700">
            {shift
              ? `${labelFor(shift.type)} shift · ${formatTime(
                  shift.start
                )}–${formatTime(shift.end)}`
              : "You are not on a scheduled shift right now."}
          </p>
          <div className="flex items-start gap-2 text-gray-700">
            <FontAwesomeIcon
              icon={faStickyNote}
              className="text-primary mt-1"
            />
            <div>
              <p className="text-sm text-ink-muted">Previous handover</p>
              {handover ? (
                <>
                  <p className="leading-relaxed whitespace-pre-line">
                    {handover.note}
                  </p>
                  <p className="text-xs text-ink">
                    {handover.staffName} · {formatDateTime(handover.at)}
                  </p>
                </>
              ) : (
                <p className="text-sm">No handover note.</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2 text-gray-700">
            <FontAwesomeIcon icon={faUsers} className="text-primary mt-1" />
            <div>
              <p className="text-sm text-ink-muted">
                On duty in your department
              </p>
              <p className="text-sm">
                {onDuty.length
                  ? onDuty
                      .map((s) => `${s.staffName} (${labelFor(s.staffRole)})`)
                      .join(", ")
                  : "Nobody else is on duty."}
              </p>
            </div>
          </div>
          {shift && (
            <div>
              <ErrorMessage error={save.error} className="mb-2" />
              {note === null ? (
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-ink">
                    {shift.handoverNote
                      ? `Your handover: ${shift.handoverNote}`
                      : "You have not written a handover note yet."}
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setNote(shift.handoverNote ?? "")}
                  >
                    {shift.handoverNote ? "Edit handover" : "Write handover"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <FormField
                    as="textarea"
                    rows={3}
                    label="Handover note for the next shift"
                    value={note}
                    maxLength={2000}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={!note.trim() || save.busy}
                      onClick={() => save.run()}
                    >
                      Save handover
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNote(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </AsyncContent>
    </Card>
  );
};

ShiftInfoSection.propTypes = {
  current: PropTypes.object.isRequired,
};

export default ShiftInfoSection;
