import Image from "next/image";
import NavigationLinks from "../NavigationItems/NavigationItems";
import SearchBox from "../SearchBox/SearchBox";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import LinkList from "../LinkList/LinkList";
import { NavigationComponentsProps, HeaderDataProps } from "./HeaderProps";

const HeaderComponents: Record<
  string,
  React.FC<{ data: NavigationComponentsProps }>
> = {
  componentNavigationItems: NavigationLinks,
  componentSearchBox: SearchBox,
  componentLanguageSelector: LanguageSelector,
  componentLinkList: LinkList,
};

const Header = ({ data }: HeaderDataProps) => {
  const primarycomponents = data?.fields?.primaryNavigation ?? [];
  const secondarycomponents = data?.fields?.secondaryNavigation ?? [];

  return (
    <div className="bg-[#0A3A6B]">
    <header className="p-4  container">
      {/* Right Section - Secondary Navigation & Language Selector */}
      <div className="flex items-center justify-end mb-5">
        <div className="flex items-center gap-6 ">
          {secondarycomponents.map((component, index) => {
            const Component =
              HeaderComponents[component?.sys?.contentType?.sys?.id];
            return <Component key={index} data={component} />;
          })}
          
        </div>
      </div>

      {/* Left Section - Logo */}
      <div className="flex items-center justify-between">
        <Image
          className="mr-4"
          src={`https://${data?.fields?.image?.fields?.file?.url}`}
          width={90}
          height={70}
          alt="Logo"
        />
        {/* Center Section - Search Box & Navigation */}
        <div className="flex flex-grow items-center justify-evenly gap-8">
          {primarycomponents.map((component, index) => {
            const Component =
              HeaderComponents[component?.sys?.contentType?.sys?.id];
            return <Component key={index} data={component} />;
          })}
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;
