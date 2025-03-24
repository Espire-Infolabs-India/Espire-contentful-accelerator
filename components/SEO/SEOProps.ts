export interface SEOProps extends SEOItems {
  items: {
    fields: SEOItems;
  }[];}

type Image = {
  fields: {
    file: {
      url: string;
    };    
  };
};
type SEOItems = {
  dataSourceName: string;
  pageTitle: string;
  metaKeyword: string;
  metaDescription: string;  
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: Image;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: Image;  
  nofollow: boolean;
  noindex: boolean;
};
