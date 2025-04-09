import React from "react";
import SEO from "../SEO/SEO";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { PoppinFont } from "@/utils/fonts";
import CookieConfig from "@/utils/lib/CookieConfig";
import Script from "next/script";
export default function Layout({
  children,
  headerData,
  footerData,
}: {
  children: React.ReactNode;
  headerData: ComponentProps;
  footerData: ComponentProps;
}) {
  return (
    <div className={`${PoppinFont.variable} font-poppin`}>
      <SEO />
      <header >
        <Header data={headerData} />
      </header>
      <main >{children}</main>
      <footer>
        <Footer data={footerData} />
      </footer>
      <Script
        src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
        strategy={"beforeInteractive"}
      ></Script>
      <CookieConfig />
    </div>
  );
}
