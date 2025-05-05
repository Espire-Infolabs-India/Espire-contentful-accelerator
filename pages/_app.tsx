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
    const loadCss = async () => {
      try {
        await import(`@/styles/${locale}.css`);
        setCssLoaded(true);
        console.log("CSS loaded for", locale);
      } catch (error) {
        console.error("Failed to load locale CSS:", error);
        setCssLoaded(true); 
      }
    };

    loadCss();
  }, [locale]);

  const { headerData, footerData, ...restProps } = pageProps;

  if (!cssLoaded) return null; // Or show a loading spinner

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <Component {...restProps} />
    </Layout>
  );
}
