import React, { memo, useMemo } from "react";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const RichText = ({ data }: ComponentDataProps) => {
  const htmlContent = useMemo(() => {
    if (!data?.fields?.content) return null;

    // Extract the actual HTML string from nested object
    const htmlString =
      data.fields.content?.content?.[0]?.content?.[0]?.value || "";

    if (!htmlString) return null;

    return (
      <section className="mt-10 bg-black text-white py-6 px-4 md:px-0 rounded-md">
        <div
          className="rich-text container m-auto"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </section>
    );
  }, [data?.fields?.content]);

  return <>{htmlContent}</>;
};

export default memo(RichText);
