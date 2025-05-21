import { FieldsType } from "contentful";
export interface ImageProps {
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
    };
  };
}

export interface ContentTypeProps {
  sys: {
    contentType: {
      sys: {
        id: string;
      };
    };
    id : string;
  };
}

export type ComponentProps = ContentTypeProps & {
  fields: FieldsType;
};

export type ComponentDataProps = {
  data: ComponentProps;
};
