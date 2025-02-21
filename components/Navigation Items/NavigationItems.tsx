import { NavigationLinksDataProps } from "./NavigationItemsProps";

const NavigationItems = ({ data }: NavigationLinksDataProps) => {
  const homePageData = data.fields.subLinks?.[0];
  const title = homePageData?.fields?.title ?? "N/A";
  const url = homePageData?.fields?.url ?? "N/A";

  return (
    <div>
      <h1>Navigation Links</h1>
      <p>Data Source: {data.fields.dataSourceName}</p>
      <p>Item Name: {data.fields.itemName}</p>
      <p>Item URL: {data.fields.itemUrl}</p>
      <p>Title: {title}</p>
      <p>URL: {url}</p>
    </div>
  );
};

export default NavigationItems;
