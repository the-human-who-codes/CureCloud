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

// Horizontally scrolling table with the shared header and row style. Children are <tr>s, which
// should use <Td> cells.
export function DataTable({ columns, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHead columns={columns} />
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

export function Td({ className = "", children, ...props }) {
  return (
    <td className={`px-6 py-4 font-poppins text-ink ${className}`} {...props}>
      {children}
    </td>
  );
}

Td.propTypes = { className: PropTypes.string, children: PropTypes.node };
