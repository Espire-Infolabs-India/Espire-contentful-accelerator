import { ContentTypeProps } from "@/utils/lib/CommonProps";
export type LinkListItemsProps = {
  fields: {
    dataSourceName: string;
    title: string;
    url: LinkListLinksComponentsProps[];
  };
  sys: ContentTypeProps;
};
export type LinkListLinksComponentsProps = {
  fields: {
    url: string;
    title: string;
  };
};

export type LinkListLinksDataProps = {
  data: LinkListItemsProps;
};
