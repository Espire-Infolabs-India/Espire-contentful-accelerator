export interface SEOProps extends SEOItems {
  items: {
    fields: SEOItems;
  }[];
}

type SEOItems = {
  dataSourceName: string;
  pageTitle: string;
  pageDescription: string;
  nofollow: boolean;
  noindex: boolean;
}