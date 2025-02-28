const SearchBox = () => {
  return (
    <div className="search-bar-default">
      <div className="search-bar flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          id="search-btn"
          className="px-3 py-2 text-gray-600 hover:text-gray-800"
          aria-label="Search"
        >
          <i className="fa fa-search"></i>
        </button>
        <input
          type="text"
          placeholder="Search"
          aria-label="search bar"
          className="w-full px-3 py-2 outline-none border-l border-gray-300"
        />
      </div>
    </div>
  );
};

export const SearchIcon = () => {
  return (
    <div className="footer-search-bar">
      <div className="search-bar flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          id="search-btn"
          className="px-3 py-2 text-gray-600 hover:text-gray-800"
          aria-label="Search"
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
