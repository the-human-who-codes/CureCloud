import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const actionShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
});

// Full-width stacked action buttons (dashboard side panels).
export function ActionList({ actions, className = "space-y-4" }) {
  return (
    <div className={className}>
      {actions.map(({ name, icon, iconClassName = "", onClick }) => (
        <button
          key={name}
          onClick={onClick}
          className="w-full px-4 py-3 bg-surface text-primary rounded-lg font-poppins hover:bg-line transition-colors duration-200 flex items-center"
        >
          <FontAwesomeIcon icon={icon} className={`mr-2 ${iconClassName}`} />
          {name}
        </button>
      ))}
    </div>
  );
}

ActionList.propTypes = {
  actions: PropTypes.arrayOf(actionShape).isRequired,
  className: PropTypes.string,
};

// Square icon-over-label action tiles in a 2/4 column grid.
export function ActionTiles({ actions }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map(({ name, icon, onClick }) => (
        <button
          key={name}
          onClick={onClick}
          className="p-4 bg-surface text-primary rounded-lg font-poppins hover:bg-line transition-colors duration-200 flex flex-col items-center"
        >
          <FontAwesomeIcon icon={icon} className="mb-2 text-xl" />
          <span className="text-sm text-center">{name}</span>
        </button>
      ))}
    </div>
  );
}

ActionTiles.propTypes = { actions: PropTypes.arrayOf(actionShape).isRequired };
