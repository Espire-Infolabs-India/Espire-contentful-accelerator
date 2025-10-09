import React from "react";
import { ComponentDataProps } from "@/utils/lib/CommonProps";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";

const ImageComponent = ({ data }: ComponentDataProps) => {
  const imageAsset = data?.fields?.image || data?.fields?.images?.[0];
  const rawImageUrl =
    imageAsset?.fields?.file?.url || imageAsset?.original_secure_url || "";

  // Ensure full URL
  const imageUrl = rawImageUrl.startsWith("http")
    ? rawImageUrl
    : `https:${rawImageUrl.startsWith("/") ? rawImageUrl : `/${rawImageUrl}`}`;

  const altText = imageAsset?.fields?.title || data?.fields?.title || "Image";

  return (
    <div className="py-10 font-sans">
      <div className="container mx-auto px-4 md:px-0 flex flex-col items-center gap-y-6">
        {/* Title */}
        {data?.fields?.title && (
          <h2 className="text-2xl sm:text-5xl mb-2 font-poppin text-center">
            {data.fields.title}
          </h2>
        )}

        {/* Description */}
        {data?.fields?.description && (
          <div className="text-base sm:text-lg font-poppin text-center max-w-3xl">
            {documentToReactComponents(
              data.fields.description as unknown as Document,
              RichtextRenderOptions
            )}
          </div>
        )}

        {/* Image */}
        {imageUrl && (
          <div className="w-full mt-6">
            <Image
              className="w-full h-auto object-cover"
              src={imageUrl}
              alt={altText}
              width={1920}  // Adjust based on your design
              height={1080} // Adjust based on your design
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
