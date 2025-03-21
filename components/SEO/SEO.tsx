import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import React, { useEffect, useState, memo, useCallback } from "react";
import { SEOProps } from "./SEOProps";
import Head from "next/head";

const SEO = () => {
  const [seoData, setSeoData] = useState<SEOProps | null>(null);

  const fetchSeoData = useCallback(async () => {
    try {
      const response = await getEntriesByContentType("seo");
      if (
        response &&
        response.items &&
        response.items[0] &&
        response.items[0].fields
      ) {
        setSeoData(response.items[0].fields as unknown as SEOProps);
      }
    } catch (error) {
      console.error("Failed to fetch SEO data:", error);
    }
  }, []);

  useEffect(() => {
    fetchSeoData();
  }, [fetchSeoData]);

  if (!seoData) return null;
  const {
    pageTitle,
    metaKeyword,
    metaDescription,
    canonicalUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
    openGraphTitle,
    openGraphDescription,
    openGraphUrl,
    openGraphImage,
    nofollow,
    noindex,
  } = seoData;
  console.log("SEO DATA", seoData);
  const robotsContent = `${nofollow ? "nofollow" : "follow"} , ${
    noindex ? "noindex" : "index"
  }`;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="keywords" content={String(metaKeyword)}></meta>
      <meta name="description" content={String(metaDescription)} />
      <link rel="canonical" href={canonicalUrl}></link>
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:site" content=""></meta>
      <meta name="twitter:title" content={String(twitterTitle)}></meta>
      <meta
        name="twitter:description"
        content={String(twitterDescription)}
      ></meta>
      <meta
        name="twitter:image"
        content={`https://${twitterImage.fields.file.url}`}
      />
      <meta property="og:locale" content="en"></meta>
      <meta property="og:title" content={String(openGraphTitle)}></meta>
      <meta
        property="og:description"
        content={String(openGraphDescription)}
      ></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content={openGraphUrl}></meta>
      <meta
        property="og:image"
        content={`https://${openGraphImage.fields.file.url}`}
      />
      <meta property="og:site_name" content=""></meta>
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default memo(SEO);
