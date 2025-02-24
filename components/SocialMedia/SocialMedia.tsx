import { SocialMediaDataProps } from "./SocialMediaProps";
const SocialMedia = ({ data }: SocialMediaDataProps) => {
  const SocialMediaData = data.fields.listOfSocialMedia?.[0];
  const image = SocialMediaData?.fields?.image ?? "N/A";
  const url = SocialMediaData?.fields?.url ?? "N/A";
  return (
<div className="flex items-center gap-4 justify-end w-full mt-4">
<a href="#" className="text-white hover:text-gray-300">
<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="h-6 w-6" />
</a>
<a href="#" className="text-white hover:text-gray-300">
<img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" className="h-6 w-6" />
</a>
<a href="#" className="text-white hover:text-gray-300">
<img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" className="h-6 w-6" />
</a>
<a href="#" className="text-white hover:text-gray-300">
<img src="https://cdn-icons-png.flaticon.com/512/733/733590.png" className="h-6 w-6" />
</a>
<a href="#" className="text-white hover:text-gray-300">
<img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" className="h-6 w-6" />
</a>
</div>
  );
};
export default SocialMedia;