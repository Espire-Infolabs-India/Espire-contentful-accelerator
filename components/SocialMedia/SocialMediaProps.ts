import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
export type SocialMediaProps = {
  fields: {
    dataSourceName: string;
    listOfSocialMedia: SocialMediaItemProps[];
  };
  sys: ContentTypeProps;
};
export type SocialMediaItemProps = {
  fields: {
    url: string;
    image: ImageProps;
  };
};

export type SocialMediaDataProps = {
  data: SocialMediaProps;
};
