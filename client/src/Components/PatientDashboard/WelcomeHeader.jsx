const WelcomeHeader = ({ userName }) => {
  const formatDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return today.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
          Welcome back, {userName || "John Smith"}
        </h1>
        <p className="font-poppins text-[#4a5568]">{formatDate()}</p>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

WelcomeHeader.propTypes = {
  userName: PropTypes.string,
};

export default WelcomeHeader;
