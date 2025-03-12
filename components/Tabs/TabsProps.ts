import { ContentTypeProps } from "@/utils/lib/CommonProps";
import { FieldsType } from "contentful";

export type TabsItemProps = {
  fields: {
    title: string;
    referencedTabItem:FieldsType;   
  };
  sys: ContentTypeProps;
};

export type TabsProps = {
  fields: {    
    title: string;
    tabs:TabsItemProps[];
    variants: string[];
  };
  sys: ContentTypeProps;
};

export type TabsDataProps = {
  data: TabsProps;
};
