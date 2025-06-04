import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
import { ComponentProps } from "@/utils/lib/CommonProps";

const HeroBannerComponent = ({ fields }: ComponentProps) => {
  const rawImageUrl =
    fields?.images?.[0]?.original_secure_url ||
    fields?.image?.fields?.file?.url;
  const imageUrl = rawImageUrl?.startsWith("http")
    ? rawImageUrl
    : `https:${rawImageUrl}`;

  const title = fields?.title || "";
  const description = fields?.description as unknown as Document;
  const ctaTitle = fields?.cta?.fields?.ctaTitle || "Learn More";
  const ctaUrl = fields?.cta?.fields?.url || "#";

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Hero Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 md:px-0 text-center">
        <div className="text-white z-10 max-w-3xl">
          <h2 className="mb-4 text-2xl sm:text-4xl font-semibold">{title}</h2>
          <h4 className="mb-6 text-lg sm:text-xl font-semibold px-5">
            {documentToReactComponents(description, RichtextRenderOptions)}
          </h4>
          <button
            type="button"
            className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
            onClick={() => {
              window.location.href = ctaUrl;
            }}
          >
            {ctaTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerComponent;
