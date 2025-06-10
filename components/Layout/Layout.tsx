import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { PoppinFont } from "@/utils/fonts";
import SEO from "../SEO/SEO";
import GlobalScripts from "../GlobalScripts/GlobalScripts";

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
  return (
    <>
      <div className={`${PoppinFont.variable} font-poppin`}>
        {seoData && <SEO {...seoData} />}
        <header>
          <Header data={headerData} />
        </header>
        <main>{children}</main>
        <footer>
          <Footer data={footerData} />
        </footer>
      </div>
      <GlobalScripts />
    </>
  );
}
