import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { PoppinFont } from "@/utils/fonts";
import CookieConfig from "@/utils/lib/CookieConfig";
import Script from "next/script";
import GoogleAnalyticsComponent from "../GoogleAnalytics/GoogleAnalytics";
import { getGoogleAnalyticsData } from "@/common/getGoogleAnalyticsData/getGoogleAnalyticsData";
import SEO from "../SEO/SEO";

export default function Layout({
  children,
  headerData,
  footerData,
  seoData,
}: {
  children: React.ReactNode;
  headerData: ComponentProps;
  footerData: ComponentProps;
  seoData: ComponentProps;
}) {
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

  useEffect(() => {}, [seoData]);

  const seoComponent = seoData;
  return (
    <>
      <GoogleAnalyticsComponent
        data={fetchedAnalyticsData ?? ({ fields: {} } as ComponentProps)}
      />

      <div className={`${PoppinFont.variable} font-poppin`}>
        {seoComponent && <SEO {...seoComponent} />}
        <header>
          <Header data={headerData} />
        </header>
        <main>{children}</main>
        <footer>
          <Footer data={footerData} />
        </footer>
        <Script
          src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
          strategy={"beforeInteractive"}
        />
        <CookieConfig />
      </div>
    </>
  );
}
