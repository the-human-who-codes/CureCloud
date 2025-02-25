import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Logo = ({ role }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (role) {
      navigate(`/${role}/dashboard`);
    }
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      <FontAwesomeIcon icon={faHeartPulse} className="text-xl text-[#2c4ecf]" />
    </div>
  );
};

Logo.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Logo;
