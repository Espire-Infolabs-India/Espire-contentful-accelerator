import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Script from "next/script";
const SocialMediaFeeds = ({ data }: ComponentDataProps) => {
  const { className, dataEmbedId, script, title } = data?.fields;
  return (
    <div className="mx-5 md:mx-0">
      <h2>{title}</h2>
      <div className={className} data-embed-id={dataEmbedId}></div>
      <Script src={script} strategy={"afterInteractive"}></Script>
    </div>
  );
};

export default SocialMediaFeeds;
