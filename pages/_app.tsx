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
        if (locale === "espire-starterkit-multisite-domain1.netlify.app") {
          await import("@/styles/site1.css"); 
          setCssLoaded(true)
        } else if (locale === "espire-starterkit-multisite-domain2.netlify.app") {
          await import("@/styles/site2.css"); 
          setCssLoaded(true)
        }
      } catch (error) {
        console.error("Error loading locale-specific styles:", error);
      }
    };

    loadLocaleStyles();
  }, [locale]); 


  const { headerData, footerData, ...restProps } = pageProps;


  console.log(cssLoaded, "CSS Loaded"); // Debugging line to check if CSS is loaded
  // if (!cssLoaded) return <h1>Wait Untill Loading Complets</h1>; 

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <Component {...restProps} />
    </Layout>
  );
}
