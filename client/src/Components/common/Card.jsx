import PropTypes from "prop-types";

const cardClasses = "bg-white rounded-xl shadow-sm border border-line";

const TITLE_SPACING = { none: "", md: "mb-4", lg: "mb-6" };

// Section heading used inside and above cards. `spacing="none"` when it sits in a flex header row.
export function SectionTitle({
  as: Tag = "h2",
  size = "xl",
  spacing = "md",
  className = "",
  children,
}) {
  return (
    <Tag
      className={`font-poppins ${
        size === "lg" ? "text-lg" : "text-xl"
      } font-semibold text-primary ${TITLE_SPACING[spacing]} ${className}`}
    >
      {children}
    </Tag>
  );
}

SectionTitle.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(["lg", "xl"]),
  spacing: PropTypes.oneOf(Object.keys(TITLE_SPACING)),
  className: PropTypes.string,
  children: PropTypes.node,
};

// White bordered card, optionally with a title. `padded={false}` for tables that run edge to edge.
export function Card({
  title,
  titleSize,
  padded = true,
  className = "",
  children,
}) {
  return (
    <div
      className={`${cardClasses} ${
        padded ? "p-6" : "overflow-hidden"
      } ${className}`}
    >
      {title && <SectionTitle size={titleSize}>{title}</SectionTitle>}
      {children}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  titleSize: PropTypes.oneOf(["lg", "xl"]),
  padded: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Heading above a block of content (the heading sits outside any card).
export function Section({ title, className, children }) {
  return (
    <div className={className}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
