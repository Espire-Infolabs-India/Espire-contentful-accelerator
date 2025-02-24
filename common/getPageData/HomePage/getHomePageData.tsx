import { GetStaticProps } from "next";
import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";

export const getHomePageStaticProps: GetStaticProps = async () => {
  const pageEntries = await getEntriesByContentType("landingPage", "home");
  const homePageData = pageEntries && pageEntries.items;

  return {
    props: {
      page: homePageData ? homePageData : {},
    },
    revalidate: 10,
  };
};
