import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const ProfessionalInformationSection = ({ profileData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
        <FontAwesomeIcon
          icon={faAddressCard}
          className="fas fa-address-card mr-2"
        />
        Contact Information
      </h2>
      <div className="space-y-4">
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Email</p>
          <p className="font-poppins text-lg">{profileData.email}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Phone</p>
          <p className="font-poppins text-lg">{profileData.phone}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">Office Location</p>
          <p className="font-poppins text-lg">{profileData.office}</p>
        </div>
        <div>
          <p className="font-poppins text-sm text-[#4a5568]">
            Emergency Contact
          </p>
          <p className="font-poppins text-lg">{profileData?.emergency?.name}</p>
          <p className="font-poppins text-sm text-[#4a5568]">
            {profileData?.emergency?.relation} • {profileData?.emergency?.phone}
          </p>
        </div>
      </div>
    </div>
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
