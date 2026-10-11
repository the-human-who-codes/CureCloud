import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Card, SectionTitle } from "../common/Card";
import InfoItem from "./InfoItem";

const ProfessionalInformationSection = ({ profileData }) => {
  return (
    <Card>
      <SectionTitle spacing="lg">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Professional Information
      </SectionTitle>
      <div className="space-y-4">
        <InfoItem label="Medical License" value={profileData.license} />
        <InfoItem label="Specialization" value={profileData.specialization} />
        <InfoItem label="Experience" value={profileData.experience} />
        <InfoItem label="Education">
          {profileData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <p className="font-poppins text-lg">{edu.degree}</p>
              <p className="font-poppins text-sm text-ink">
                {edu.institution}, {edu.year}
              </p>
            </div>
          ))}
        </InfoItem>
      </div>
    </Card>
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
