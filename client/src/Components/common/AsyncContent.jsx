import PropTypes from "prop-types";

// Renders loading / error / empty states for a useApi() result, otherwise the children.
function AsyncContent({
  loading,
  error,
  empty,
  emptyText = "Nothing here yet.",
  children,
}) {
  if (loading)
    return <p className="font-poppins text-sm text-[#4a5568]">Loading…</p>;
  if (error)
    return <p className="font-poppins text-sm text-red-600">{error.message}</p>;
  if (empty)
    return <p className="font-poppins text-sm text-[#4a5568]">{emptyText}</p>;
  return children;
}

AsyncContent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  empty: PropTypes.bool,
  emptyText: PropTypes.string,
  children: PropTypes.node,
};

export default AsyncContent;
