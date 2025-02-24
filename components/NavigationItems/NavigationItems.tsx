import { NavigationLinksDataProps } from "./NavigationItemsProps";

const NavigationItems = ({ data }: NavigationLinksDataProps) => {
  const navigationItems = data?.fields?.subLinks;
  return (
    <div>
      <p>Title: {data?.fields?.itemName}</p>
      <p>Title: {data?.fields?.itemUrl}</p>
      {navigationItems?.map((navigationitems, index) => {
        return (
          <div className="px-7" key={index}>
            <p>Title: {navigationitems?.fields?.title}</p>
            <p>URL: {navigationitems?.fields?.url}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NavigationItems;
