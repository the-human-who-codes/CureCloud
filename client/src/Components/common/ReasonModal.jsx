import { useState } from "react";
import PropTypes from "prop-types";
import { useAction } from "../../hooks/useApi";
import { ErrorMessage } from "./AsyncContent";
import { Button } from "./Button";
import { FormField } from "./FormField";
import Modal from "./Modal";

// Asks for a reason before a status change (cancel, stop, retract, disable…). With `options` the
// reason is picked from an enum; otherwise it is free text of at most `maxLength` characters.
// `onSubmit(reason)` may throw an ApiError, which is shown in the dialog.
function ReasonModal({
  title,
  label = "Reason",
  confirmLabel = "Confirm",
  options,
  required = true,
  maxLength = 200,
  onSubmit,
  onClose,
}) {
  const [reason, setReason] = useState(options?.[0]?.value ?? "");
  const [touched, setTouched] = useState(false);
  const action = useAction(async () => {
    await onSubmit(reason.trim());
    onClose();
  });
  const missing = required && !reason.trim();

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!missing) action.run();
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Back
          </Button>
          <Button type="submit" form="reason-form" disabled={action.busy}>
            {action.busy ? "Saving…" : confirmLabel}
          </Button>
        </>
      }
    >
      <form id="reason-form" onSubmit={submit} className="space-y-4">
        <ErrorMessage error={action.error} />
        {options ? (
          <FormField
            as="select"
            label={label}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </FormField>
        ) : (
          <FormField
            as="textarea"
            rows={3}
            label={label}
            value={reason}
            maxLength={maxLength}
            onChange={(e) => setReason(e.target.value)}
            error={touched && missing ? "Required" : undefined}
            hint={`${reason.length}/${maxLength}`}
          />
        )}
      </form>
    </Modal>
  );
}

ReasonModal.propTypes = {
  title: PropTypes.node.isRequired,
  label: PropTypes.node,
  confirmLabel: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.node })
  ),
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReasonModal;
