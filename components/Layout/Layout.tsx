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
        const data = await getFooterData();
        if (
          data?.props?.data &&
          Array.isArray(data.props.data) &&
          data.props.data.length > 0
        ) {
          setFooterData(data.props.data[0]);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const headData = await getHeaderData();
        if (
          headData?.props?.data &&
          Array.isArray(headData.props.data) &&
          headData.props.data.length > 0
        ) {
          setHeaderData(headData.props.data[0]);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
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
