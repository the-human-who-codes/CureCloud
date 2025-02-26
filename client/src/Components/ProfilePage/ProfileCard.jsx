import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faKey } from "@fortawesome/free-solid-svg-icons";
const ProfileCard = ({ profileData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={profileData.image}
          alt="Dr. Sarah Connor"
          className="w-48 h-48 rounded-full object-cover border-4 border-[#e1e8ff]"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-poppins text-3xl font-bold text-[#2c4ecf] mb-2">
            {profileData.name}
          </h1>
          <p className="font-poppins text-xl text-[#4a5568] mb-4">
            {profileData.title}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
              <FontAwesomeIcon icon={faEdit} className="fas fa-edit mr-2" />
              Edit Profile
            </button>
            <button className="px-6 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200">
              <FontAwesomeIcon icon={faKey} className="fas fa-key mr-2" />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profileData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
