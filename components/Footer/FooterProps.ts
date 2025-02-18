import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
export type FooterProps = {
  fields: {
    copyrightText: string;
    address: Document;
    image: ImageProps;
  };
  sys: ContentTypeProps;
};

export type FooterDataProps = {
  data: FooterProps;
};
