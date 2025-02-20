import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";

export const getFooterData = async () => {
  const getFooterData = await getEntriesByContentType("componentFooter");
  const footerComponentData = getFooterData && getFooterData?.items;

  return {
    props: {
      data: footerComponentData ? footerComponentData : {},
    },
    revalidate: 10,
  };
};
