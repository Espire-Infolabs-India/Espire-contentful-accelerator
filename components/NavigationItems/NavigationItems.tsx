import Link from "next/link";
import { NavigationLinksDataProps } from "./NavigationItemsProps";

const NavigationItems = ({ data, isLast }: NavigationLinksDataProps & { isLast?: boolean }) => {
  const navigationItems = data?.fields?.subLinks;

  return (
    <nav className="relative">
      <ul className="flex space-x-6">
        <li className="group relative">
          <Link
            href={data.fields.itemUrl}
            className="text-white px-4 py-2 rounded-md transition duration-300 
            hover:bg-white hover:text-gray-800 text-sm"
          >
            {data.fields.itemName}
          </Link>

          {/* Dropdown Menu */}
          {navigationItems && (
            <ul
            className="absolute right-0 flex-wrap hidden group-hover:flex bg-white shadow-lg rounded-lg w-96 z-50 justify-start">
              {navigationItems.map((navigationItem, index) => (
                <li key={index} className="border-b last:border-none text-center">
                  <Link
                    href={navigationItem.fields.url}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {navigationItem.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationItems;
