import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Link from "next/link";
import React from "react";

const CTA = ({ data }: ComponentDataProps) => {
  const { ctaTitle, url } = data?.fields;
  const target = data?.fields?.linkTarget[0];
  const isExternal = target === "blank";
  return (
    <>
      <div className="container my-10 m-auto">
        <Link
          href={url}
          target={"_" + target}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {ctaTitle}
        </Link>
      </div>
    </>
  );
};

export default CTA;
