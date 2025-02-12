import React, { memo, useMemo } from "react";
import { RichTextDataProps } from "./RichTextProps";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const RichText = ({ data }: RichTextDataProps) => {
  const richTextContent = useMemo(() => {
    if (!data?.fields?.content) return null;
    return (
      <div className="rich-text">
        {documentToReactComponents(
          data.fields.content as unknown as Document,
          RichtextRenderOptions
        )}
      </div>
    );
  }, [data?.fields?.content]);
  return <>{richTextContent}</>;
};

export default memo(RichText);
