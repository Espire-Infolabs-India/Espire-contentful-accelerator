import React, { useEffect, useState } from "react";
import SEO from "../SEO/SEO";
import { getFooterData } from "@/common/getFooterData/getFooterData";
import Footer from "../Footer/Footer";
import { FooterProps } from "../Footer/FooterProps";
import Header from "../Header/Header";
import { HeaderProps } from "../Header/HeaderProps";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [footerData, setFooterData] = useState<FooterProps | null>(null);
  const [HeaderData, setHeaderData] = useState<HeaderProps | null>(null);
  useEffect(() => {
    async function getData() {
      try {
        const footerData = await getFooterData();
        const headData = await getHeaderData();
        if (
          footerData?.data &&
          Array.isArray(footerData.data) &&
          footerData.data.length > 0
        ) {
          setFooterData(footerData.data[0]);
        }
        if (
          headData?.data &&
          Array.isArray(headData.data) &&
          headData.data.length > 0
        ) {
          setHeaderData(headData.data[0]);
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
