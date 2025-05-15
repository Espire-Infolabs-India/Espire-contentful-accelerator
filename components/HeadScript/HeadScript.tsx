import { ComponentDataProps } from "@/utils/lib/CommonProps";
import Head from "next/head";

const HeadScriptComponent = ({ data }: ComponentDataProps) => {
  const { scriptId, scriptSrc, enabled, scriptContent } = data?.fields || {};
  if (!enabled || (!scriptSrc && !scriptContent)) return null;
  return (
    <Head>
      <script id={scriptId} src={scriptSrc} async>
        {scriptContent}
      </script>
    </Head>
  );
};
export default HeadScriptComponent;
