import GoogleAnalyticsComponent from "../GoogleAnalytics/GoogleAnalytics";
import { useEffect, useState } from "react";
import { getGoogleAnalyticsData } from "@/common/getGoogleAnalyticsData/getGoogleAnalyticsData";
import { ComponentProps } from "@/utils/lib/CommonProps";
// import CookieConfig from "@/utils/lib/CookieConfig";

const GlobalScripts = () => {
  const [fetchedAnalyticsData, setFetchedAnalyticsData] =
    useState<ComponentProps | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getGoogleAnalyticsData();
        if (Array.isArray(result.data) && result.data.length > 0) {
          setFetchedAnalyticsData(result?.data[0] as ComponentProps);
        }
      } catch (error) {
        console.error("Error fetching Google Analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);
  return (
    <>
      <GoogleAnalyticsComponent
        data={fetchedAnalyticsData ?? ({ fields: {} } as ComponentProps)}
      />
      {/* Enable this for CIVIC UK Implementation */}
      {/* <Script
          src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
          strategy={"beforeInteractive"}
        />
        <CookieConfig /> */}
    </>
  );
};

export default GlobalScripts;
