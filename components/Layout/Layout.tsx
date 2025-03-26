import React from "react";
import SEO from "../SEO/SEO";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ComponentProps } from "@/utils/lib/CommonProps";

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
