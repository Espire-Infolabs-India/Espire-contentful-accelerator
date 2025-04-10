import "@/styles/globals.css";
import "@/components/Header/header.css";
import "@/components/Footer/footer.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const { headerData, footerData, ...restProps } = pageProps;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <Component {...restProps} />
    </Layout>
  );
}
