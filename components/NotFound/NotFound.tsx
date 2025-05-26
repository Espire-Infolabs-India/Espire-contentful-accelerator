import Head from "next/head";

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <div className="no-found">
      <div className="cover-not-found">
        <span className="text-6xl md:text-9xl font-semibold">404</span>
        <h1 className="h5 my-2">Page not found</h1>
        <p className="my-2">This page does not exist.</p>
        <a href="/">Go to the Home page</a>
      </div>
    </div>
  </>
);

export default NotFound;
