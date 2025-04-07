import React from "react";
import SEO from "../SEO/SEO";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ComponentProps } from "@/utils/lib/CommonProps";
import Head from "next/head";
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
    <div>
      <Head>
        <link href="../../public/favicon.ico" type="image/x-icon" rel="icon" />
        <link
          href="../../public/favicon.ico"
          type="image/x-icon"
          rel="shortcut icon"
        />
      </Head>
      <SEO />
      <header>
        <Header data={headerData} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer data={footerData} />
      </footer>
    </div>
  );
}
