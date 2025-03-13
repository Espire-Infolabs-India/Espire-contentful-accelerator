import Image from "next/image";
import NavigationLinks from "../NavigationItems/NavigationItems";
import SearchBox from "../SearchBox/SearchBox";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import LinkList from "../LinkList/LinkList";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const HeaderComponents: Record<
  string,
  React.FC<{ data: ComponentProps }> | undefined
> = {
  componentNavigationItems: NavigationLinks,
  componentSearchBox: SearchBox,
  componentLanguageSelector: LanguageSelector,
  componentLinkList: LinkList,
};

const Header = ({ data }: ComponentDataProps) => {
  if (!data || !data.fields) return null; // Prevents errors if `data` is undefined

  const primarycomponents = data.fields.primaryNavigation ?? [];
  const secondarycomponents = data.fields.secondaryNavigation ?? [];

  return (
    <div className="bg-[#0A3A6B]">
      <header className="p-4 container">
        {/* Right Section - Secondary Navigation & Language Selector */}
        <div className="flex items-center justify-end mb-5">
          <div className="flex items-center gap-6">
            {secondarycomponents?.map(
              (component: ComponentProps, index: number) => {
                if (!component?.sys?.contentType?.sys?.id) return null;

                const Component =
                  HeaderComponents[component?.sys?.contentType?.sys?.id];
                if (!Component) return null;

                return <Component key={index} data={component} />;
              }
            )}
          </div>
        </div>

        {/* Left Section - Logo */}
        <div className="flex items-center justify-between">
          {data.fields.image?.fields?.file?.url && (
            <Image
              className="mr-4"
              src={`https://${data?.fields?.image?.fields?.file?.url}`}
              width={90}
              height={70}
              alt="Logo"
              unoptimized
            />
          )}

          {/* Center Section - Search Box & Navigation */}
          <div className="flex flex-grow items-center justify-evenly gap-8">
            <SearchBox />
            {primarycomponents?.map((component: ComponentProps) => {
              if (!component?.sys?.contentType?.sys?.id) return null;

              const ComponentType =
                HeaderComponents[component?.sys?.contentType?.sys?.id];

              if (!ComponentType) return null;

              return (
                <div key={component?.sys?.contentType?.sys?.id}>
                  {component?.fields && <NavigationItems data={component} />}
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
