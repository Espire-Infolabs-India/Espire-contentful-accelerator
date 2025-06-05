import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="algolia-site-verification" content="009BA592012D7ED5" />
        {/* Preconnect and DNS Prefetch for Usercentrics CMP */}
        <link rel="preconnect" href="https://web.cmp.usercentrics.eu" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://web.cmp.usercentrics.eu" />
        {/* Preconnect and DNS Prefetch for Contentful assets */}
        <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
