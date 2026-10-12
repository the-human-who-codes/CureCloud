import PropTypes from "prop-types";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// Round avatar: the person's photo when there is one, otherwise their initials.
function InitialsAvatar({ name, photoUrl, large = false, className = "" }) {
  if (photoUrl)
    return (
      <img
        src={photoUrl}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${
          large ? "w-16 h-16" : "w-10 h-10"
        } rounded-full object-cover ${className}`}
      />
    );
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
  photoUrl: PropTypes.string,
  large: PropTypes.bool,
  className: PropTypes.string,
};

export default InitialsAvatar;
