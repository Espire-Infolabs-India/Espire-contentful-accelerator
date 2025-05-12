import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Head from "next/head";

const HeadScriptComponent = ({ data }: ComponentDataProps) => {
  const { scriptId, scriptSrc, enabled } = data?.fields || {};

  if (!enabled) return null;

  let src = "";
  if (typeof scriptSrc === "string") {
    src = scriptSrc;
  } else if (scriptSrc?.content?.[0]?.content?.[0]?.value) {
    src = scriptSrc.content[0].content[0].value;
  }

  if (!src) return null;

  return (
    <Head>
      <script id={scriptId || "external-script"} src={src} async></script>
    </Head>
  );
};

export default HeadScriptComponent;
