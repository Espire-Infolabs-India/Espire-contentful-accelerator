import React, { memo, useMemo } from "react";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const RichText = ({ data }: ComponentDataProps) => {
  const richTextContent = useMemo(() => {
    if (!data?.fields?.content) return null;
    return (
      <section className="mt-10">
      <div className="rich-text container m-auto px-4 md:px-0">
        {documentToReactComponents(
          data.fields.content as unknown as Document,
          RichtextRenderOptions
        )}
      </div>
      </section>
    );
  }, [data?.fields?.content]);
  return <>{richTextContent}</>;
};

export default memo(RichText);
