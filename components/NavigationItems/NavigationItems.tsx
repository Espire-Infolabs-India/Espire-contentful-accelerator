import Link from "next/link";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const makeAbsolute = (url: string): string =>
  url?.startsWith("/") ? url : `/${url}`;

const NavigationItems = ({ data }: ComponentDataProps) => {
  const navigationItems = data?.fields?.subLinks;

  return (
    <>
      <Link href={makeAbsolute(data.fields.itemUrl)}>
        {data.fields.itemName}
      </Link>

      {navigationItems && (
        <ul className="flex flex-col lg:flex-row lg:flex-wrap static lg:absolute z-10 left-0 lg:invisible lg:group-hover:visible rounded bg-white shadow-lg px-2 lg:px-0 mt-2 w-full">
          {navigationItems.map(
            (navigationItem: ComponentProps, index: number) => (
              <li key={index} className="last:border-none">
                <Link
                  href={makeAbsolute(navigationItem.fields.url)}
                  className="block p-2 text-black lg:px-10 lg:py-4"
                >
                  {navigationItem.fields.title}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};

export default NavigationItems;
