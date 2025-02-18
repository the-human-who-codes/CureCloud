import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPrint } from "@fortawesome/free-solid-svg-icons";

const ActionButtons = () => {
  return (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
        <FontAwesomeIcon icon={faFileExport} className="mr-2" />
        Export Reports
      </button>
      <button className="px-4 py-2 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
        <FontAwesomeIcon icon={faPrint} className="mr-2" />
        Print
      </button>
    </div>
  );
};
export default ActionButtons;
