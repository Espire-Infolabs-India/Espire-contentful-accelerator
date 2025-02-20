import { ContentTypeProps } from "@/utils/lib/CommonProps";
//import { HomePageProps } from "@/common/getPageData/HomePage/HomePageProps";
export type NavigationLinksProps = {
  fields: {
    dataSourceName: string;
    listOfNavigation: NavigationLinksComponentsProps[];
  };
  sys: ContentTypeProps;
};
export type NavigationLinksComponentsProps = {
  fields: {
    url: string;
    title: string;
  };
};

export type NavigationLinksDataProps = {
  data: NavigationLinksProps;
};
