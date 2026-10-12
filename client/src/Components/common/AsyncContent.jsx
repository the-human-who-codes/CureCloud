import PropTypes from "prop-types";
import { Button } from "./Button";

// An API error (ApiError) as a red message, with per-field validation errors underneath.
export function ErrorMessage({ error, className = "" }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className={`p-3 bg-red-50 text-red-700 rounded-lg font-poppins text-sm ${className}`}
    >
      <p>{error.message}</p>
      {error.errors?.length > 0 && (
        <ul className="mt-1 list-disc list-inside">
          {error.errors.map((e) => (
            <li key={`${e.path}-${e.message}`}>
              {e.path ? `${e.path}: ` : ""}
              {e.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
  className: PropTypes.string,
};

// Muted placeholder text for an empty list or panel.
export function EmptyState({ children }) {
  return <p className="font-poppins text-sm text-ink py-2">{children}</p>;
}

EmptyState.propTypes = { children: PropTypes.node };

// Renders loading / error / empty states for a useApi() or usePagedApi() result, otherwise the children.
function AsyncContent({
  loading,
  error,
  empty,
  emptyText = "Nothing here yet.",
  children,
}) {
  if (loading) return <p className="font-poppins text-sm text-ink">Loading…</p>;
  if (error) return <ErrorMessage error={error} />;
  if (empty) return <EmptyState>{emptyText}</EmptyState>;
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

// "Load more" button for a usePagedApi() list; renders nothing on the last page.
export function LoadMore({ hasMore, loadMore, loadingMore }) {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center p-4">
      <Button
        variant="secondary"
        size="sm"
        onClick={loadMore}
        disabled={loadingMore}
      >
        {loadingMore ? "Loading…" : "Load more"}
      </Button>
    </div>
  );
}

LoadMore.propTypes = {
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool,
};
