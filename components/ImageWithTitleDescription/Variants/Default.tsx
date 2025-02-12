import React from "react";
import Image from "next/image";
import { ImageWithTitleDescriptionDataProps } from "../ImageWithTitleDescriptionProps";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const Default = ({ data }: ImageWithTitleDescriptionDataProps) => {
  return (
    <div className="py-16 px-8 font-sans">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-x-6 gap-y-8">
        <div className="md:w-full">
          <Image
            className="mb-5"
            src={`https://${data?.fields?.image?.fields?.file?.url}`}
            width={600}
            height={400}
            alt={""}
          />
          <h2 className="text-3xl font-semibold mb-4">{data?.fields?.title}</h2>
          <div className="text-base">
            {documentToReactComponents(
              data.fields.description as unknown as Document,
              RichtextRenderOptions
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
