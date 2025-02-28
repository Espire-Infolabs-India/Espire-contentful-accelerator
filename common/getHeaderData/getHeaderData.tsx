import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";

export const getHeaderData = async () => {
  const getHeaderData = await getEntriesByContentType("componentHeader");
  const headerComponentData = getHeaderData && getHeaderData?.items;

  return {
    props: {
      data: headerComponentData ? headerComponentData : {},
    },
    revalidate: 10,
  };
};
