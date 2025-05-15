import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Script from "next/script";

const HeadScriptComponent = ({ data }: ComponentDataProps) => {
  const { scriptId, scriptSrc, enabled, scriptContent } = data?.fields || {};
  if (!enabled || (!scriptSrc && !scriptContent)) return null;
  return (
    <>
      <Script id={scriptId} src={scriptSrc} strategy="afterInteractive">
        {scriptContent}
      </Script>
    </>
  );
};
export default HeadScriptComponent;
