import { PoppinFont } from "@/utils/fonts";

const SearchBox = () => {
  return (
    <div className="search-bar-default">
      <input
        type="text"
        placeholder="Type to search"
        className={`w-[150px] focus:outline-none placeholder-white sm:w-[250px] text-[14px] lg:w-[35cqw] p-[7px] bg-[var(--royalblue)] border-white text-white border-solid border-[1px] ${PoppinFont.className}`}
      />
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
