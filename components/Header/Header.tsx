import { NavigationComponentsProps, HeaderDataProps } from "./HeaderProps";
import Image from "next/image";
import NavigationLinks from "../Navigation Items/NavigationItems";
import SearchBox from "../SearchBox/SearchBox";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const HeaderComponents: Record<
  string,
  React.FC<{ data: NavigationComponentsProps }>
> = {
  componentNavigationItems: NavigationLinks,
  componentSearchBox: SearchBox,
  componentLanguageSelector: LanguageSelector
};

const Header = ({ data }: HeaderDataProps) => {
  const primarycomponents = data?.fields?.primaryNavigation ?? [];
  const secondarycomponents = data?.fields?.secondaryNavigation ?? [];
  return (
    <div>
      <div className="component-content">
        <Image
          className="mb-5"
          src={`https://${data?.fields?.image?.fields?.file?.url}`}
          width={600}
          height={400}
          alt={""}
        />
      </div>
      {primarycomponents.map((component, index) => {
        const Component =
          HeaderComponents[component?.sys?.contentType?.sys?.id];
        return (
          <div className="px-7" key={index}>
            <Component key={index} data={component} />
          </div>
        );
      })}
      {secondarycomponents.map((component, index) => {
        const Component =
          HeaderComponents[component?.sys?.contentType?.sys?.id];
        return (
          <div className="px-7" key={index}>
            <Component key={index} data={component} />
          </div>
        );
      })}
    </div>
  );
};

export default Header;
