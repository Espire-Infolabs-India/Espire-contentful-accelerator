// import "@/styles/globals.css";
import "@/components/Header/header.css";
import "@/components/Footer/footer.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    const loadLocaleStyles = async () => {
      try {
        if (locale === "site1") {
          await import("@/styles/site1.css"); 
          setCssLoaded(true)
        } else if (locale === "site2") {
          await import("@/styles/site2.css"); 
          setCssLoaded(true)
        }
      } catch (error) {
        console.error("Error loading locale-specific styles:", error);
      }
    };

    loadLocaleStyles();
  }, [locale]); // Re-run the effect when the locale changes


  const { headerData, footerData, ...restProps } = pageProps;

  console.log("cssLoaded" , cssLoaded)

  if (!cssLoaded) return null;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <Component {...restProps} />
    </Layout>
  );
}
