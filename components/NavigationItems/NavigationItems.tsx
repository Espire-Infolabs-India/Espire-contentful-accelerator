import Link from "next/link";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const NavigationItems = ({ data }: ComponentDataProps) => {
  const navigationItems = data?.fields?.subLinks;

  return (
    <nav className="relative">
      <ul className="flex space-x-6">
        <li className="group relative">
          <Link
            href={data.fields.itemUrl}
            className="text-white hover:text-gray-300"
          >
            {data.fields.itemName}
          </Link>

          {/* Dropdown Menu */}
          {navigationItems && (
            <ul className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-48">
              {navigationItems?.map(
                (navigationItem: ComponentProps, index: number) => (
                  <li key={index} className="border-b last:border-none">
                    <Link
                      href={navigationItem.fields.url}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {navigationItem.fields.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationItems;
