import "@/components/Header/header.css";
import "@/components/Footer/footer.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Script from "next/script";
const Layout = dynamic(() => import("@/components/Layout/Layout"), {
  ssr: false,
});
const NinetailedProvider = dynamic(
  () =>
    import("@ninetailed/experience.js-next").then(
      (mod) => mod.NinetailedProvider
    ),
  { ssr: false }
);
export default function App({ Component, pageProps }: AppProps) {
  const [cssLoaded, setCssLoaded] = useState(false);
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "site1";
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
        setCssLoaded(true); // allow render even if CSS fails
      }
    };
    loadLocaleStyles();
  }, []);
  const { headerData, footerData, seoData, ...restProps } = pageProps;
  const ninetailedClientId = process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID || "";
  const ninetailedEnvironment =
    process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT || "";
  return (
    <>
      {/* Defer loading Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5PK2TXF4GB"
        strategy="afterInteractive"
      />
      {ninetailedClientId && ninetailedEnvironment ? (
        <NinetailedProvider
          clientId={ninetailedClientId}
          environment={ninetailedEnvironment}
          useSDKEvaluation={true}
        >
          <Layout
            headerData={headerData}
            footerData={footerData}
            seoData={seoData}
          >
            <Component {...restProps} />
          </Layout>
        </NinetailedProvider>
      ) : (
        <Layout
          headerData={headerData}
          footerData={footerData}
          seoData={seoData}
        >
          <Component {...restProps} />
        </Layout>
      )}
    </>
  );
}
