import React from "react";
import Image from "next/image";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const Default = ({ data }: ComponentDataProps) => {
  return (
    <div className="py-10 font-sans">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center gap-x-6 gap-y-8">
        <div className="md:w-full">
          <Image
            className="mb-5"
            src={`${
              data?.fields?.images?.[0]?.original_secure_url?.startsWith("http")
                ? data?.fields?.images[0]?.original_secure_url
                : `https://${data?.fields?.image?.fields?.file?.url}`
            }`}
            width={400}
            height={101}
            alt={""}
          />
          <h2 className={`text-2xl sm:text-5xl mb-4 font-poppin`}>{data?.fields?.title}</h2>
          <div className="text-base font-poppin">
            {documentToReactComponents(
              data.fields.description as unknown as Document,
              RichtextRenderOptions
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
