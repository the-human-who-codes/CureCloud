import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { Card, SectionTitle } from "../common/Card";
import InfoItem from "./InfoItem";

const ContactInformationSection = ({ profileData }) => {
  return (
    <Card>
      <SectionTitle className="mb-6">
        <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
        Contact Information
      </SectionTitle>
      <div className="space-y-4">
        <InfoItem label="Email" value={profileData.email} />
        <InfoItem label="Phone" value={profileData.phone} />
        <InfoItem label="Office Location" value={profileData.office} />
        <InfoItem
          label="Emergency Contact"
          value={profileData?.emergency?.name}
        >
          <p className="font-poppins text-sm text-ink">
            {profileData?.emergency?.relation} • {profileData?.emergency?.phone}
          </p>
        </InfoItem>
      </div>
    </Card>
  );
};

ContactInformationSection.propTypes = {
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

export default ContactInformationSection;
