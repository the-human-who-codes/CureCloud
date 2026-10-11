import PropTypes from "prop-types";

// Page body rendered inside DashboardLayout's <Outlet />; .page-content does the scrolling.
export function PageShell({
  contained = true,
  className = "bg-surface",
  children,
}) {
  return (
    <div className={`min-h-full px-6 py-8 ${className}`}>
      {contained ? (
        <div className="max-w-[1920px] mx-auto">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

PageShell.propTypes = {
  contained: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Page title, optional subtitle and right-aligned actions.
export function PageHeader({ title, subtitle, actions, centered = false }) {
  return (
    <div
      className={`flex justify-between items-center mb-8 ${
        centered ? "text-center" : ""
      }`}
    >
      <div className={centered ? "flex-auto" : undefined}>
        <h1 className="font-poppins text-2xl font-bold text-primary">
          {title}
        </h1>
        {subtitle && <p className="font-poppins text-ink">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  centered: PropTypes.bool,
};
