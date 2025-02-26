import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ProfessionalInformationSection = ({ profileData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
        <FontAwesomeIcon icon={faUser} className="fas fa-user-md mr-2" />
        Professional Information
      </h2>
      <div className="space-y-4">
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Medical License</p>
          <p className="font-poppins text-lg">{profileData.license}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Specialization</p>
          <p className="font-poppins text-lg">{profileData.specialization}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Experience</p>
          <p className="font-poppins text-lg">{profileData.experience}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Education</p>
          {profileData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <p className="font-poppins text-lg">{edu.degree}</p>
              <p className="font-poppins text-sm text-[#4a5568]">
                {edu.institution}, {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProfessionalInformationSection.propTypes = {
  profileData: PropTypes.shape({
    license: PropTypes.string,
    specialization: PropTypes.string,
    experience: PropTypes.string,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string,
        institution: PropTypes.string,
        year: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ProfessionalInformationSection;
