import { ContentTypeProps } from "@/utils/lib/CommonProps";

export type SearchBoxProps = {
  fields: {
    dataSourceName: string;
  };
  sys: ContentTypeProps;
};

export type SearchBoxDataProps = {
  data: SearchBoxProps;
};
