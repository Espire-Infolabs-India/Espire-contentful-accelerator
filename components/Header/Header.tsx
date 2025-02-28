import { NavigationComponentsProps, HeaderDataProps } from "./HeaderProps";
import Image from "next/image";
import NavigationLinks from "../NavigationItems/NavigationItems";
import SearchBox from "../SearchBox/SearchBox";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import LinkList from "../LinkList/LinkList";

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
  if (!data || !data.fields) {
    return null;
  }

  const primarycomponents = Array.isArray(data.fields.primaryNavigation)
    ? data.fields.primaryNavigation
    : [];

  const secondarycomponents = Array.isArray(data.fields.secondaryNavigation)
    ? data.fields.secondaryNavigation
    : [];

  return (
    <div>
      <div className="component-content">
        {data.fields.image?.fields?.file?.url ? (
          <Image
            className="mb-5"
            src={`https://${data.fields.image.fields.file.url}`}
            width={600}
            height={400}
            alt="Header Image"
            unoptimized
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      {primarycomponents.map((component, index) => {
        const contentTypeId = component?.sys?.contentType?.sys?.id;

        if (!contentTypeId || !HeaderComponents[contentTypeId]) {
          return null;
        }

        const Component = HeaderComponents[contentTypeId];

        return (
          <div className="px-7" key={index}>
            <Component data={component} />
          </div>
        );
      })}

      {secondarycomponents.map((component, index) => {
        const contentTypeId = component?.sys?.contentType?.sys?.id;

        if (!contentTypeId || !HeaderComponents[contentTypeId]) {
          return null;
        }

        const Component = HeaderComponents[contentTypeId];

        return (
          <div className="px-7" key={index}>
            <Component data={component} />
          </div>
        );
      })}
    </div>
  );
};

export default Header;
