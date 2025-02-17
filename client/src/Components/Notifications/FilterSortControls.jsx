import PropTypes from "prop-types";

function FilterSortControls({ filter, setFilter, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf] mb-4 md:mb-0">
        Notifications
      </h1>
      <div className="flex gap-4 w-full md:w-auto">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568] flex-1 md:flex-none"
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 bg-white border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568] flex-1 md:flex-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

FilterSortControls.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default FilterSortControls;
