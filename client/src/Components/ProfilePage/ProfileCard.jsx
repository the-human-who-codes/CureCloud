import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faKey } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../assets/default-avatar.svg";
import { Button } from "../common/Button";

const ProfileCard = ({ name, title, photoUrl, settingsPath, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-line p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={photoUrl || defaultAvatar}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-48 h-48 rounded-full object-cover border-4 border-line"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-poppins text-3xl font-bold text-primary mb-2">
            {name}
          </h1>
          <p className="font-poppins text-xl text-ink mb-4">{title}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button icon={faEdit} onClick={onEdit}>
              Edit Profile
            </Button>
            <Link
              to={settingsPath}
              className="px-6 py-3 bg-surface text-primary rounded-lg font-poppins hover:bg-line transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faKey} className="mr-2" />
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  settingsPath: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProfileCard;
