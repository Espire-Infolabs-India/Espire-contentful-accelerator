import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="algolia-site-verification" content="009BA592012D7ED5" />

        {/* Preconnect and DNS Prefetch for Usercentrics CMP */}
        <link
          rel="preconnect"
          href="https://web.cmp.usercentrics.eu"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://web.cmp.usercentrics.eu" />

        {/* Preconnect and DNS Prefetch for Contentful assets */}
        <link
          rel="preconnect"
          href="https://images.ctfassets.net"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />

        {/* Preload critical CSS (Optional) */}
        {/* <link rel="preload" href="/styles/critical-styles.css" as="style" /> */}

        {/* Preload the LCP image (Optional) */}
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/drq9dq7az/image/upload/v1749726584/Contenful_Banner_o1ztif.webp"
          type="image/webp"
        />

        {/* Optional: Preload Google Fonts (If you're using Google Fonts) */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          as="style"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
