import React from "react";
import Image from "next/image";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const LeftSideImage = ({ data }: ComponentDataProps) => {
  const imageAsset = data?.fields?.images?.[0] || data?.fields?.image;
  const rawImageUrl =
    imageAsset?.original_secure_url || imageAsset?.fields?.file?.url;
  const imageUrl = rawImageUrl?.startsWith("http")
    ? rawImageUrl
    : `https:${rawImageUrl?.startsWith("/") ? rawImageUrl : `/${rawImageUrl}`}`;
  const altText =
    imageAsset?.fields?.title || data?.fields?.title || "Content image";
  return (
    <div className="max-w-full flex flex-col md:flex-row items-center py-0 md:py-6 px-0 md:px-4 bg-gray-100">
      <div className="md:w-1/2 flex justify-center">
        {imageUrl && (
          <Image src={imageUrl} width={600} height={400} alt={altText} />
        )}
      </div>
      <div className="md:w-1/2 p-4 md:p-6">
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
