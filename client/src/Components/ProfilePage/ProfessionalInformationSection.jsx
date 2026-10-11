import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ProfessionalInformationSection = ({ profileData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-line p-6">
      <h2 className="font-poppins text-xl font-semibold text-primary mb-6">
        <FontAwesomeIcon icon={faUser} className="fas fa-user-md mr-2" />
        Professional Information
      </h2>
      <div className="space-y-4">
        <div>
          <p className="font-poppins text-sm text-ink">Medical License</p>
          <p className="font-poppins text-lg">{profileData.license}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Specialization</p>
          <p className="font-poppins text-lg">{profileData.specialization}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Experience</p>
          <p className="font-poppins text-lg">{profileData.experience}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Education</p>
          {profileData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <p className="font-poppins text-lg">{edu.degree}</p>
              <p className="font-poppins text-sm text-ink">
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
