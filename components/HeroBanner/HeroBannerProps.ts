import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";

type CTALink = {
  fields: {
    ctaTitle: string;
    url: string;
  };
};

export type HeroBannerProps = {
  fields: {
    title: string;
    description: Document;
    image: ImageProps;
    cta: CTALink;
  };
  sys: ContentTypeProps;
};

export type HeroBannerDataProps = {
  data: HeroBannerProps;
};
