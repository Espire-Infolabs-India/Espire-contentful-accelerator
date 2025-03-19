import React, { useEffect, useState } from "react";
import SEO from "../SEO/SEO";
import { getFooterData } from "@/common/getFooterData/getFooterData";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import { ComponentProps } from "@/utils/lib/CommonProps";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [footerData, setFooterData] = useState<ComponentProps | null>(null);
  const [HeaderData, setHeaderData] = useState<ComponentProps | null>(null);
  useEffect(() => {
    async function getData() {
      try {
        const headData = await getHeaderData();
        if (
          headData?.data &&
          Array.isArray(headData?.data) &&
          headData?.data?.length > 0
        ) {
          setHeaderData(headData?.data[0]);
        }
        const footerData = await getFooterData();
        if (
          footerData?.data &&
          Array.isArray(footerData?.data) &&
          footerData?.data?.length > 0
        ) {
          setFooterData(footerData?.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <SEO />
      <header>{HeaderData && <Header data={HeaderData} />}</header>
      <main>{children}</main>
      <footer>{footerData && <Footer data={footerData} />}</footer>
    </div>
  );
}
