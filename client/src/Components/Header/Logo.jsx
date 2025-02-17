import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

const Logo = () => (
  <div className="flex items-center">
    <FontAwesomeIcon icon={faHeartPulse} className="text-xl text-[#2c4ecf]" />
  </div>
);

export default Logo;
