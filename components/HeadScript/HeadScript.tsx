import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Script from "next/script";

const HeadScriptComponent = ({ data }: ComponentDataProps) => {
  const { scriptId, scriptSrc, enabled, scriptContent } = data?.fields || {};

  if (!enabled) return null;

  const scriptsrc = scriptSrc?.content?.[0]?.content?.[0]?.value || "";
  const content = scriptContent?.content?.[0]?.content?.[0]?.value || "";

  if (!scriptsrc && !content) {
    return null;
  }
console.log(scriptsrc, content);
  return (
    <>
      <Script id={scriptId} src={scriptsrc} strategy="afterInteractive">
        {content}
      </Script>
    </>
  );
};

export default HeadScriptComponent;
