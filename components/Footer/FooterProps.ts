import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
import { SocialMediaProps } from "../SocialMedia/SocialMediaProps";
import { LinkListItemsProps } from "../LinkList/LinkListProps";

export type FooterProps = {
  fields: {
    copyrightText: string;
    componentContainer: FooterComponentsProps[];
    address: Document;
    image: ImageProps;
  };
  sys: ContentTypeProps;
};
export type FooterComponentsProps = LinkListItemsProps & SocialMediaProps;

export type FooterDataProps = {
  data: FooterProps;
};
