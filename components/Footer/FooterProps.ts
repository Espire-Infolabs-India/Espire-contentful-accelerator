import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
import { NavigationItemsProps } from "../Navigation Items/NavigationItemsProps";
import { SocialMediaProps } from "../SocialMedia/SocialMediaProps";

export type FooterProps = {
  fields: {
    copyrightText: string;
    componentContainer: FooterComponentsProps[];
    address: Document;
    image: ImageProps;
  };
  sys: ContentTypeProps;
};
export type FooterComponentsProps = NavigationItemsProps & SocialMediaProps;

export type FooterDataProps = {
  data: FooterProps;
};
