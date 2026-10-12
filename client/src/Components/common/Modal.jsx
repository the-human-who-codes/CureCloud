import { useEffect, useId } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./Button";

const WIDTHS = { md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

// Open dialogs, innermost last, so Escape only closes the top one.
const openDialogs = [];

// Centred dialog over a dimmed backdrop. Escape (on the top dialog) and the close button call
// onClose.
function Modal({ title, onClose, size = "md", footer, children }) {
  const id = useId();
  useEffect(() => {
    openDialogs.push(id);
    return () => openDialogs.splice(openDialogs.indexOf(id), 1);
  }, [id]);
  useEffect(() => {
    const onKey = (e) =>
      e.key === "Escape" && openDialogs.at(-1) === id && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [id, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={`bg-white rounded-xl w-full ${WIDTHS[size]} max-h-[90vh] flex flex-col m-4`}
      >
        <div className="p-6 border-b border-line flex items-center justify-between">
          <h2 className="font-poppins text-xl font-bold text-primary">
            {title}
          </h2>
          <IconButton icon={faTimes} onClick={onClose} title="Close" />
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
        {footer && (
          <div className="p-6 border-t border-line bg-surface flex justify-end gap-4 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(Object.keys(WIDTHS)),
  footer: PropTypes.node,
  children: PropTypes.node,
};

export default Modal;
