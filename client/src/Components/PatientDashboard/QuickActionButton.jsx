// QuickActionButton.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const QuickActionButton = ({ action }) => (
  <button className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center">
    <FontAwesomeIcon icon={action.icon} className="mr-2" />
    {action.name}
  </button>
);

QuickActionButton.propTypes = {
  action: PropTypes.shape({
    icon: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuickActionButton;
