import { NavigationLinksDataProps } from "./NavigationLinksProps";

const NavigationLinks = ({ data }: NavigationLinksDataProps) => {
  const homePageData = data.fields.listOfNavigation?.[0];
  const title = homePageData?.fields?.title ?? "N/A";
  const url = homePageData?.fields?.url ?? "N/A";

  return (
    <div>
      <h1>Navigation Links</h1>
      <p>Data Source: {data.fields.dataSourceName}</p>
      <p>Title: {title}</p>
      <p>URL: {url}</p>
    </div>
  );
};

export default NavigationLinks;
