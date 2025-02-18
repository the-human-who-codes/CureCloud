import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faDownload } from "@fortawesome/free-solid-svg-icons";

const LabResultsTable = ({ recentLabResults }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
      <div className="p-6 border-b border-[#e1e8ff]">
        <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
          Recent Lab Results
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f8faff]">
            <tr>
              <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                Patient Name
              </th>
              <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                Test Type
              </th>
              <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                Date
              </th>
              <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                Status
              </th>
              <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                Result
              </th>
              <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {recentLabResults.map((result) => (
              <tr key={result.id} className="border-t border-[#e1e8ff]">
                <td className="px-6 py-4 font-poppins text-[#4a5568]">
                  {result.patientName}
                </td>
                <td className="px-6 py-4 font-poppins text-[#4a5568]">
                  {result.testType}
                </td>
                <td className="px-6 py-4 font-poppins text-[#4a5568]">
                  {result.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-poppins ${
                      result.status === "Complete"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {result.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-poppins ${
                      result.result === "Normal"
                        ? "bg-green-100 text-green-800"
                        : result.result === "Abnormal"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {result.result}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#2c4ecf] hover:text-[#1a3baf] mr-4">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-[#2c4ecf] hover:text-[#1a3baf]">
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

LabResultsTable.propTypes = {
  recentLabResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      patientName: PropTypes.string.isRequired,
      testType: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LabResultsTable;
