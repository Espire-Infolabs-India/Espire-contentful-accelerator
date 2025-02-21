import { ContentTypeProps } from "@/utils/lib/CommonProps";

export type LanguageSelectorProps = {
  fields: {
    dataSourceName: string;
  };
  sys: ContentTypeProps;
};

export type LanguageSelectorDataProps = {
  data: LanguageSelectorProps;
};
