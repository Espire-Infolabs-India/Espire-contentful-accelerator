import React from "react";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const PlainHtml = ({ data }: ComponentDataProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: data?.fields?.plainHtmlCode }} />
  );
};

export default PlainHtml;
