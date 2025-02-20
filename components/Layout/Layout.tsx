import React, { useEffect, useState } from "react";
import SEO from "../SEO/SEO";
import { getFooterData } from "@/common/getFooterData/getFooterData";
import Footer from "../Footer/Footer";
import { FooterProps } from "../Footer/FooterProps";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [footerData, setFooterData] = useState<FooterProps | null>(null);

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

  return (
    <div>
      <SEO />
      <header>
        <h1>This is Header</h1>
      </header>
      <main>{children}</main>
      <footer>{footerData && <Footer data={footerData} />}</footer>
    </div>
  );
}
