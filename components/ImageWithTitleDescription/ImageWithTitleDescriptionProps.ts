import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";

export type ImageWithTitleDescriptionProps = {
  fields: {
    title: string;
    description: Document;
    image: ImageProps;
    variants: string[];
  };
  sys: ContentTypeProps;
};

export type ImageWithTitleDescriptionDataProps = {
  data: ImageWithTitleDescriptionProps;
};
