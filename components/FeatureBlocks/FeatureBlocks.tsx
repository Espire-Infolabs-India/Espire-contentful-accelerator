import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FeatureBlocksPropsDataProps } from "../FeatureBlocks/FeatureBlocksProps";
import { Document } from "@contentful/rich-text-types";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import {ContentTypeProps} from "@/utils/lib/CommonProps";

const FeatureBlocks = ({ data }: FeatureBlocksPropsDataProps) => {
  return (
    <div>
      <h1>{data?.fields?.title}</h1>
      <h1>
        {documentToReactComponents(
          data.fields.description as unknown as Document,
          RichtextRenderOptions
        )}
      </h1>
      <div className="flex">
        {data?.fields?.componentContainer?.map((data: { sys: ContentTypeProps  }, index: number) => {
          const componentType = data.sys.contentType.sys.id;
          const Component = ComponentFactory[
            componentType
          ] as unknown as React.ComponentType<{ data: typeof data }>;

          return (
            <div key={index} className="feature-blocks">
              {Component && <Component key={index} data={data} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureBlocks;
