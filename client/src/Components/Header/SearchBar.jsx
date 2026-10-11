import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, onSearch, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
      <div className="relative">
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search patients, appointments, records..."
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
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
