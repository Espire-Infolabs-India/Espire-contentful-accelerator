import React from "react";
import Image from "next/image";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const LeftSideImage = ({ data }: ComponentDataProps) => {
  return (
    <div className="max-w-full flex flex-col md:flex-row items-center bg-slate-100">
      <div className="md:w-1/2 flex justify-center">
        <Image
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
      <div className="md:w-1/2 p-4 md:p-10">
        <h2 className="text-3xl font-semibold mb-4 font-poppins">
          {data?.fields?.title}
        </h2>
        <div className="mt-4 text-base font-poppins">
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
