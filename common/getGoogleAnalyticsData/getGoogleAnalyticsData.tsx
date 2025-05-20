import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
export const getGoogleAnalyticsData = async () => {
  const getgoogleAnalyticsData = await getEntriesByContentType(
    "componentGoogleAnalytics"
  );
  const GoogleAnalyticsComponentData =
    getgoogleAnalyticsData && getgoogleAnalyticsData?.items;
  return {
    data: GoogleAnalyticsComponentData ? GoogleAnalyticsComponentData : {},
  };
};
