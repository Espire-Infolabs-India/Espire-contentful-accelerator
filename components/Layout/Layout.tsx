import React from "react";
import SEO from "../SEO/SEO";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SEO />
      <header>
        <h1>This is Header</h1>
      </header>
      <main>{children}</main>
      <footer>
        <h1>This is Footer</h1>
      </footer>
    </div>
  );
}
