import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
import { ComponentProps } from "@/utils/lib/CommonProps";

const HeroBannerComponent = (props: ComponentProps) => {
  return (
    <div
      className="hero-banner relative  bg-cover bg-no-repeat p-12 text-center"
      style={{
        backgroundImage: `url(${
          props?.fields?.images?.[0]?.original_secure_url ||
          props?.fields?.image?.fields?.file?.url
        })`,
        height: "400px",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="flex h-full items-center justify-center px-4 md:px-0">
          <div className="text-white">
            <h2 className="mb-4 text-2xl sm:text-4xl font-semibold">
              {props?.fields?.title}
            </h2>
            <h4 className="mb-6 text-lg sm:text-xl font-semibold px-5">
              {documentToReactComponents(
                props?.fields?.description as unknown as Document,
                RichtextRenderOptions
              )}
            </h4>
            <button
              type="button"
              className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() =>
                (window.location.href = `${props?.fields?.cta?.fields?.url}`)
              }
            >
              {props?.fields?.cta?.fields?.ctaTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerComponent;
