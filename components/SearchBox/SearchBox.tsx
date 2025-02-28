 

const SearchBox = () => {
  return (
    <div className="relative w-80">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full bg-transparent border border-white text-white placeholder-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
      />
      {/* Search Icon */}
      <div className="absolute right-3 top-3 text-white text-lg"></div>
    </div>
  );
};

export default SearchBox;
