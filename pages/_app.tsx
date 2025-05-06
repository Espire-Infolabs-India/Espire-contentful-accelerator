// import "@/styles/globals.css";
import "@/components/Header/header.css";
import "@/components/Footer/footer.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const loadLocaleStyles = async () => {
      try {
        if (domain === "site1") {
          await import("@/styles/site1.css");
        } else if (domain === "site2") {
          await import("@/styles/site2.css");
        }
        setCssLoaded(true);
      } catch (error) {
        console.error("Error loading locale-specific styles:", error);
      }
    };
  
    loadLocaleStyles();
  }, []);
  

  const { headerData, footerData, ...restProps } = pageProps;
  if (!cssLoaded) return null;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <Component {...restProps} />
    </Layout>
  );
}
