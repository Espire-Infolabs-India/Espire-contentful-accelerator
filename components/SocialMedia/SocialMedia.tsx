import Link from "next/link";
import Image from "next/image";
import { SocialMediaDataProps } from "./SocialMediaProps";
const SocialMedia = ({ data }: SocialMediaDataProps) => {
  const SocialMediaData = data.fields.listOfSocialMedia;
  return (
    <div className="flex items-center justify-end w-full">
      {SocialMediaData.map((SocialMediaDatacomponent, index) => {
        const image = SocialMediaDatacomponent?.fields?.image ?? "N/A";
        const url = SocialMediaDatacomponent?.fields?.url ?? "N/A";
        return (
          <div className="px-4" key={index}>
            <Link href={url} className="text-white hover:text-gray-300">
              <Image
                src={`https://${image.fields?.file?.url}`}
                className="h-6 w-6"
                alt={""}
                width={24}
                height={24}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default SocialMedia;
