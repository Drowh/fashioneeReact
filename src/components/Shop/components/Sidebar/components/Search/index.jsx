import './style.css'
const Search = ({ onSearchChange }) => {
  return (
    <div className="search">
      <label>
        <input
          type="text"
          placeholder="Search"
          className="input search-row"
          onChange={onSearchChange}
        />
        <img
          src="./icons/search.svg"
          alt="Search Icon"
          className="search-icon"
        />
      </label>
    </div>
  );
};

export default Search;
