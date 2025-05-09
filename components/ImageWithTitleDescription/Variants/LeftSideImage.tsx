import React from "react";
import Image from "next/image";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const LeftSideImage = ({ data }: ComponentDataProps) => {
  return (
    <div className="max-w-full flex flex-col md:flex-row items-center bg-slate-100 py-2.5 px-8">
      <div className="md:w-1/2 flex justify-center">
        <Image
          className="mb-5"
          src={`${
            data?.fields?.images?.[0]?.original_secure_url?.startsWith("http")
              ? data?.fields?.images[0]?.original_secure_url
              : `https://${data?.fields?.image?.fields?.file?.url}`
          }`}
          width={600}
          height={400}
          alt={""}
          unoptimized
        />
      </div>
      <div className="md:w-1/2 py-12 px-7">
        <h2 className="text-3xl font-semibold mb-4">{data?.fields?.title}</h2>
        <div className="mt-4 text-base">
          {documentToReactComponents(
            data.fields.description as unknown as Document,
            RichtextRenderOptions
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideImage;
