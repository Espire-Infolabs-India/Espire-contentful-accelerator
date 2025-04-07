import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="algolia-site-verification" content="009BA592012D7ED5" />
        <link href="../images/favicon.ico" type="image/x-icon" rel="icon" />
        <link
          href="../images/favicon.ico"
          type="image/x-icon"
          rel="shortcut icon"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
