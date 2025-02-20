import { SocialMediaDataProps } from "./SocialMediaProps";

const SocialMedia = ({ data }: SocialMediaDataProps) => {
    const SocialMediaData = data.fields.listOfSocialMedia?.[0];
  const image = SocialMediaData?.fields?.image ?? "N/A";
  const url = SocialMediaData?.fields?.url ?? "N/A";
  console.log("Social Media", data);
  return (
    <div>
      <h1>Social Media</h1>
      <p>Data Source: {data.fields.dataSourceName}</p>
      {image.fields.file.url}
      {url}      
    </div>
  );
};

export default SocialMedia;
