import Link from "next/link";
import Image from "next/image";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const SocialMedia = ({ data }: ComponentDataProps) => {
  const SocialMediaData = data.fields.listOfSocialMedia;
  return (
    <div className="flex items-center justify-center w-full">
      {SocialMediaData?.map((item: ComponentProps, index: number) => {
        const image = item?.fields?.image ?? null;
        const url = item?.fields?.url ?? "#";
        const imageUrl = image?.fields?.file?.url
          ? `https://${image.fields.file.url}`
          : null;

        const platformName = image?.fields?.title || `Social media link ${index + 1}`;
        const altText = `Visit our ${platformName}`;
        const ariaLabel = `Link to our ${platformName} profile`;

        return (
          <div className="px-4" key={url + index}>
            <Link
              href={url}
              className="text-white hover:text-gray-300"
              aria-label={ariaLabel}
            >
              {imageUrl && (
                <Image src={imageUrl} alt={altText} width={24} height={24} />
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMedia;
