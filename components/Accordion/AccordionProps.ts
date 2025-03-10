import { ContentTypeProps } from "@/utils/lib/CommonProps";

export type AccordionItemListProps = {
  fields: {
    heading: string;
    summary: string;
  };
  sys: ContentTypeProps;
};

export type AccordionItemList = AccordionItemListProps;

export type AccordionProps = {
  fields: {
    title: string;
    accordionItemsList: AccordionItemListProps[]; // Changed to an array of AccordionItemListProps
  };
};

export type AccordionDataProps = {
  data: AccordionProps;
};
