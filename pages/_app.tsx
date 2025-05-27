import "@/components/Header/header.css";
import "@/components/Footer/footer.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import { NinetailedProvider } from "@ninetailed/experience.js-next";

export default function App({ Component, pageProps }: AppProps) {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "site1";
    const loadLocaleStyles = async () => {
      try {
        if (domain === "site1") {
          await import("@/styles/site1.css");
          setCssLoaded(true);
        } else if (domain === "site2") {
          await import("@/styles/site2.css");
          setCssLoaded(true);
        }
      } catch (error) {
        console.error("Error loading locale-specific styles:", error);
      }
    };

    loadLocaleStyles();
  }, []);

  const { headerData, footerData, seoData, ...restProps } = pageProps;
  if (!cssLoaded) return null;

  return (
    <NinetailedProvider
      clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID || ""}
      environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT || ""}
      useSDKEvaluation={true}
    >
      <Layout headerData={headerData} footerData={footerData} seoData={seoData}>
        <Component {...restProps} />
      </Layout>
    </NinetailedProvider>
  );
}
