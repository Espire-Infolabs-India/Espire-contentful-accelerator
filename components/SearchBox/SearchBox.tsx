const SearchBox = () => {
  return (
    <div className="search-bar-default">
      <div className="search-bar flex items-center overflow-hidden">
        <input
          type="text"
          placeholder="Search"
          aria-label="search bar"
          className="w-full min-w-[495px] bg-transparent border border-white text-white placeholder-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
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
