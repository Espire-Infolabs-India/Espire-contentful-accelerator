import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Script from "next/script";
const SocialMediaFeeds = ({ data }: ComponentDataProps) => {
  const { className, dataEmbedId, script, title } = data?.fields;
  return (
    <div>
      <h1>{title}</h1>
      <div className={className} data-embed-id={dataEmbedId}></div>
      <Script src={script} strategy={"afterInteractive"}></Script>
    </div>
  );
};

export default SocialMediaFeeds;
