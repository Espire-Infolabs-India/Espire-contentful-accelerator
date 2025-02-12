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
  const { pageTitle, pageDescription, nofollow, noindex } = seoData;

  const robotsContent = `${nofollow ? "nofollow" : "follow"} , ${
    noindex ? "noindex" : "index"
  }`;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={String(pageDescription)} />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default memo(SEO);
