import PropTypes from "prop-types";
import { Button } from "../common/Button";

function FilterSortControls({
  filter,
  setFilter,
  sort,
  setSort,
  onMarkAllRead,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <h1 className="font-poppins text-2xl font-bold text-primary mb-4 md:mb-0">
        Notifications
      </h1>
      <div className="flex gap-4 w-full md:w-auto">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter"
          className="px-4 py-2 bg-white border border-line rounded-lg font-poppins text-ink flex-1 md:flex-none"
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort"
          className="px-4 py-2 bg-white border border-line rounded-lg font-poppins text-ink flex-1 md:flex-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <Button size="sm" variant="secondary" onClick={onMarkAllRead}>
          Mark all read
        </Button>
      </div>
    </div>
  );
}

FilterSortControls.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  onMarkAllRead: PropTypes.func.isRequired,
};

export default FilterSortControls;
