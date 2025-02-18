import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";

function RoleCard({ role, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
        isSelected
          ? "border-[#2c4ecf] bg-white shadow-lg scale-105"
          : "border-[#e1e8ff] bg-white/50 hover:bg-white hover:shadow-md"
      }`}
    >
      <div
        className={`w-12 h-12 ${role.color} rounded-full flex items-center justify-center mb-4`}
      >
        <FontAwesomeIcon icon={role.icon} className="text-[#2c4ecf] text-xl" />
      </div>
      <h3 className="font-poppins font-semibold text-lg text-[#2c4ecf] mb-2">
        {role.title}
      </h3>
      <p className="font-poppins text-sm text-[#4a5568]/80">
        {role.description}
      </p>
    </button>
  );
}

RoleCard.propTypes = {
  role: PropTypes.shape({
    color: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RoleCard;
