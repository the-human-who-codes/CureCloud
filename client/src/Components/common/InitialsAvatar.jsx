import PropTypes from "prop-types";

const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

// Round placeholder avatar showing a person's initials.
function InitialsAvatar({ name, large = false, className = "" }) {
  return (
    <div
      className={`${
        large ? "w-16 h-16" : "w-10 h-10"
      } rounded-full bg-line flex items-center justify-center ${className}`}
    >
      <span
        className={`font-poppins ${
          large ? "text-xl " : ""
        }font-medium text-primary`}
      >
        {initials(name)}
      </span>
    </div>
  );
}

InitialsAvatar.propTypes = {
  name: PropTypes.string,
  large: PropTypes.bool,
  className: PropTypes.string,
};

export default InitialsAvatar;
