import Head from "next/head";
import { ComponentProps } from "@/utils/lib/CommonProps";

const SEO = (props: ComponentProps) => {
  const { fields } = props;
  if (!fields) return null;

  const {
    pageTitle,
    metaKeyword = "",
    metaDescription = "",
    twitterTitle = "",
    twitterDescription = "",
    twitterImage,
    openGraphTitle = "",
    openGraphDescription = "",
    openGraphImage,
    nofollow = false,
    noindex = false,
  } = fields;

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";

  const robotsContent = `${nofollow ? "nofollow" : "follow"}, ${
    noindex ? "noindex" : "index"
  }`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="keywords" content={String(metaKeyword)} />
      <meta name="description" content={String(metaDescription)} />
      <link rel="canonical" href={currentUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={String(twitterTitle)} />
      <meta name="twitter:description" content={String(twitterDescription)} />
      {twitterImage?.fields?.file?.url && (
        <meta name="twitter:image" content={twitterImage.fields.file.url} />
      )}
      <meta property="og:locale" content="en" />
      <meta property="og:title" content={String(openGraphTitle)} />
      <meta property="og:description" content={String(openGraphDescription)} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      {openGraphImage?.fields?.file?.url && (
        <meta property="og:image" content={openGraphImage.fields.file.url} />
      )}
      <meta property="og:site_name" content="" />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default SEO;
