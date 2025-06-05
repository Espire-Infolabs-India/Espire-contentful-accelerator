import React from "react";
import Image from "next/image";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const RightSideImage = ({ data }: ComponentDataProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center pt-2 pb-4 bg-slate-100">
      <div className="md:w-1/2 p-6">
        <h2 className="text-3xl font-semibold mb-4 font-poppins ">
          {data?.fields?.title}
        </h2>
        <div className="mt-4 text-base font-poppins">
          {documentToReactComponents(
            data.fields.description as unknown as Document,
            RichtextRenderOptions
          )}
        </div>
      </div>
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
        />
      </div>
    </div>
  );
};

export default RightSideImage;
