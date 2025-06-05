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
        
        {/* Preload critical CSS (Optional) */}
        <link rel="preload" href="/styles/critical-styles.css" as="style" />

        {/* Preload the LCP image (Optional) */}
        <link
          rel="preload"
          href="https://images.ctfassets.net/p4eo7hggs5be/4Z4T9..." // Use your actual LCP image URL here
          as="image"
          type="image/webp"
          sizes="(max-width: 1920px) 100vw, 1920px"
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
