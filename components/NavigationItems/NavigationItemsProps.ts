import { ContentTypeProps } from "@/utils/lib/CommonProps";
export type NavigationItemsProps = {
  fields: {
    dataSourceName: string;
    itemName: string;
    itemUrl: string;
    subLinks: NavigationLinksComponentsProps[];
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
  data: NavigationItemsProps;
};
