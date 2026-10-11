import PropTypes from "prop-types";

export const cardClasses = "bg-white rounded-xl shadow-sm border border-line";

// Section heading used inside and above cards.
export function SectionTitle({
  as: Tag = "h2",
  size = "xl",
  className = "mb-4",
  children,
}) {
  return (
    <Tag
      className={`font-poppins ${
        size === "lg" ? "text-lg" : "text-xl"
      } font-semibold text-primary ${className}`}
    >
      {children}
    </Tag>
  );
}

SectionTitle.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(["lg", "xl"]),
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
