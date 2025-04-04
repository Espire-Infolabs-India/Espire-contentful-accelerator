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

export default SearchBox;
