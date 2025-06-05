import React from "react";
import Image from "next/image";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const Default = ({ data }: ComponentDataProps) => {
  const imageAsset = data?.fields?.images?.[0] || data?.fields?.image;
  const rawImageUrl =
    imageAsset?.original_secure_url || imageAsset?.fields?.file?.url;

  const imageUrl = rawImageUrl?.startsWith("http")
    ? rawImageUrl
    : `https:${rawImageUrl?.startsWith("/") ? rawImageUrl : `/${rawImageUrl}`}`;

  const altText =
    imageAsset?.fields?.title || data?.fields?.title || "Image";

  return (
    <div className="py-10 font-sans">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center gap-x-6 gap-y-8">
        <div className="md:w-full">
          {imageUrl && (
            <Image
              className="mb-5"
              src={imageUrl}
              width={400}
              height={101}
              alt={altText}
            />
          )}
          <h2 className="text-2xl sm:text-5xl mb-4 font-poppin">
            {data?.fields?.title}
          </h2>
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
