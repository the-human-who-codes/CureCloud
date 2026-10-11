import PropTypes from "prop-types";

// Shared <thead> for the app's data tables.
function TableHead({ columns }) {
  return (
    <thead className="bg-surface">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="px-6 py-4 font-poppins text-sm text-ink text-left"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHead;
