export interface SEOProps extends SEOItems {
  items: {
    fields: SEOItems;
  }[];
}
// type Link = {
//   fields: {
//     ctaTitle: string;
//     url: string;
//   };
// };
type Image = {
  fields: {
    file: {
      url: string;
    };
    title: string;
  };
};
type SEOItems = {
  dataSourceName: string;
  pageTitle: string;
  metaKeyword: string;
  metaDescription: string;
  canonicalUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: Image;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: Image;
  openGraphUrl: string;
  nofollow: boolean;
  noindex: boolean;
};
