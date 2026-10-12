import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// Where a header search goes per role; the target page passes ?q= to the API as a name prefix.
const SEARCH_TARGETS = {
  doctor: { path: "/doctor/patient-records", placeholder: "Search patients…" },
  nurse: { path: "/nurse/my-patients", placeholder: "Search patients…" },
  admin: { path: "/admin/user-management", placeholder: "Search users…" },
};

const SearchBar = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const target = SEARCH_TARGETS[role];
  if (!target) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    navigate(q ? `${target.path}?q=${encodeURIComponent(q)}` : target.path);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
      <div className="relative">
        <input
          type="search"
          name="search"
          value={searchTerm}
          maxLength={60}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={target.placeholder}
          aria-label={target.placeholder}
          className="w-full px-4 py-2 pl-10 bg-surface border border-line rounded-lg focus:outline-none focus:border-primary font-poppins"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink"
        />
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  role: PropTypes.string.isRequired,
};

export default SearchBar;
