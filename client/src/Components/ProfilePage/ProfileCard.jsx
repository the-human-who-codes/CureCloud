import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faKey } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../common/Button";

const ProfileCard = ({ profileData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-line p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={profileData.image}
          alt="Dr. Sarah Connor"
          className="w-48 h-48 rounded-full object-cover border-4 border-line"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-poppins text-3xl font-bold text-primary mb-2">
            {profileData.name}
          </h1>
          <p className="font-poppins text-xl text-ink mb-4">
            {profileData.title}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button icon={faEdit}>Edit Profile</Button>
            <button className="px-6 py-3 bg-surface text-primary rounded-lg font-poppins hover:bg-line transition-colors duration-200">
              <FontAwesomeIcon icon={faKey} className="mr-2" />
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
