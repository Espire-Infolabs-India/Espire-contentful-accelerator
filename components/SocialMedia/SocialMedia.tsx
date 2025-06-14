import Link from "next/link";
import Image from "next/image";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const SocialMedia = ({ data }: ComponentDataProps) => {
  const SocialMediaData = data?.fields?.listOfSocialMedia;
  return (
    <div className="flex items-center justify-center w-full">
      {SocialMediaData?.map(
        (SocialMediaDatacomponent: ComponentProps, index: number) => {
          const image = SocialMediaDatacomponent?.fields?.image ?? "";
          const url = SocialMediaDatacomponent?.fields?.url ?? "";
          const platformName =
            SocialMediaDatacomponent?.fields?.title ||
            `Social Media ${index + 1}`;
          const altText = `Visit our ${platformName}`;
          return (
            <div className="px-4" key={index}>
              <Link
                href={url}
                className="text-white hover:text-gray-300"
                target="_blank"
              >
                <Image
                  src={
                    image?.fields?.file?.url?.startsWith("//")
                      ? `https:${image.fields.file.url}`
                      : image?.fields?.file?.url ?? ""
                  }
                  className="h-6 w-6"
                  alt={altText}
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default SocialMedia;
