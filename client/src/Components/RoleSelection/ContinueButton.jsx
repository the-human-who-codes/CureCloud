// ContinueButton.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

function ContinueButton({ selectedRole, isLoading, onClick, roles }) {
  return (
    <button
      onClick={onClick}
      disabled={!selectedRole || isLoading}
      className={`px-8 py-4 bg-[#2c4ecf] text-white rounded-xl font-poppins transition-all duration-200 inline-flex items-center gap-3
        ${
          !selectedRole ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1a3baf]"
        }
      `}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Preparing your dashboard...</span>
        </>
      ) : (
        <>
          <span>
            Continue as{" "}
            {selectedRole
              ? roles.find((r) => r.id === selectedRole)?.title
              : "..."}
          </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </>
      )}
    </button>
  );
}

ContinueButton.propTypes = {
  selectedRole: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContinueButton;
