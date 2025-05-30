import Head from "next/head";
import Header from "../Header/Header";
import { ComponentProps } from "@/utils/lib/CommonProps";
import Footer from "../Footer/Footer";

/**
 * Rendered in case if we have 404 error
 */
const NotFound = ({
  headerData,
  footerData,
}: {
  headerData: ComponentProps;
  footerData: ComponentProps;
}): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <header>
      <Header data={headerData} />
    </header>
    <div className="no-found">
      <div className="cover-not-found">
        <span className="text-6xl md:text-9xl font-semibold">404</span>
        <h1 className="h5 my-2">Page not found</h1>
        <p className="my-2">This page does not exist.</p>
        <a href="/">Go to the Home page</a>
      </div>
    </div>
    <footer>
      <Footer data={footerData} />
    </footer>
  </>
);

export default NotFound;
