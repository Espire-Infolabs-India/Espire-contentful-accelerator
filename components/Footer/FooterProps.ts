import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
import { NavigationLinksProps } from "../Navigation Links/NavigationLinksProps";
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
export type FooterComponentsProps = NavigationLinksProps & SocialMediaProps;

export type FooterDataProps = {
  data: FooterProps;
};
