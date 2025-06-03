import React from "react";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const PlainHtml = ({ data }: ComponentDataProps) => {
  return (
    <div className="container m-auto py-5 px-5 md:px-0" dangerouslySetInnerHTML={{ __html: data?.fields?.plainHtmlCode }} />
  );
};

export default PlainHtml;
