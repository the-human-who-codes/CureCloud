import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { Card, SectionTitle } from "../common/Card";

const ProfessionalInformationSection = ({ profileData }) => {
  return (
    <Card>
      <SectionTitle className="mb-6">
        <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
        Contact Information
      </SectionTitle>
      <div className="space-y-4">
        <div>
          <p className="font-poppins text-sm text-ink">Email</p>
          <p className="font-poppins text-lg">{profileData.email}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Phone</p>
          <p className="font-poppins text-lg">{profileData.phone}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Office Location</p>
          <p className="font-poppins text-lg">{profileData.office}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-ink">Emergency Contact</p>
          <p className="font-poppins text-lg">{profileData?.emergency?.name}</p>
          <p className="font-poppins text-sm text-ink">
            {profileData?.emergency?.relation} • {profileData?.emergency?.phone}
          </p>
        </div>
      </div>
    </Card>
  );
};

ProfessionalInformationSection.propTypes = {
  profileData: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    office: PropTypes.string,
    emergency: PropTypes.shape({
      name: PropTypes.string,
      relation: PropTypes.string,
      phone: PropTypes.string,
    }),
  }).isRequired,
};

export default ProfessionalInformationSection;
