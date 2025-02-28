import { NavigationLinksDataProps } from "./NavigationItemsProps";

const NavigationItems = ({ data }: NavigationLinksDataProps) => {
  const navigationItems = data?.fields?.subLinks;
  return (
    <div className="top-menus">
      <ul>
        <li className="item0 odd first">
          <a title="" target="" className="" href={data.fields.itemUrl}>
            {data.fields.itemName}
          </a>
        </li>
      </ul>
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
