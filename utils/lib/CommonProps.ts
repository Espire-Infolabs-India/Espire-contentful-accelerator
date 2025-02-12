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
  contentType: {
    sys: {
      id: string;
    };
  };
}
