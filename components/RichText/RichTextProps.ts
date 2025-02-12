import { ContentTypeProps } from "@/utils/lib/CommonProps";

export type RichTextProps = {
  fields: {
    content: Document;
  };
  sys: ContentTypeProps;
};

export type RichTextDataProps = {
  data: RichTextProps;
};
