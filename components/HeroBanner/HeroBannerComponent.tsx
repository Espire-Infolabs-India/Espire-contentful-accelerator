import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
import { ComponentProps } from "@/utils/lib/CommonProps";

const HeroBannerComponent = ({ fields }: ComponentProps) => {
  const imageAsset = fields?.images?.[0] || fields?.image;

  const rawImageUrl =
    imageAsset?.original_secure_url || imageAsset?.fields?.file?.url;

  const baseImageUrl = rawImageUrl?.startsWith("http")
    ? rawImageUrl
    : `https:${rawImageUrl?.startsWith("/") ? rawImageUrl : `/${rawImageUrl}`}`;

  const altText = fields?.title || "Hero banner image";
  const title = fields?.title || "";
  const description = fields?.description as unknown as Document;
  const ctaTitle = fields?.cta?.fields?.ctaTitle || "Learn More";
  const ctaUrl = fields?.cta?.fields?.url || "#";

  return (
    <section className="relative w-full bg-black">
      <div className="max-w-screen-xl mx-auto relative overflow-hidden">
        {/* Hero Image */}
        {baseImageUrl && (
          <Image
            src={baseImageUrl}
            alt={altText}
            width={1920}
            height={720}
            priority
            className="object-cover w-full h-auto"
            sizes="100vw"
            quality={80}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 md:px-0 text-center">
          <div className="text-white z-10 max-w-3xl">
            <h2 className="mb-4 text-2xl sm:text-4xl font-semibold">{title}</h2>
            <h3 className="mb-6 text-lg sm:text-xl font-semibold px-5">
              {documentToReactComponents(description, RichtextRenderOptions)}
            </h3>
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
    </section>
  );
};

export default HeroBannerComponent;
