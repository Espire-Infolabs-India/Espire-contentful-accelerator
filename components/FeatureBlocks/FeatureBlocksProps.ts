import { FieldsType } from "contentful";

export interface FeatureBlocks {
  fields: FieldsType;
}

export type FeatureBlocksProps = FeatureBlocks;

export type FeatureBlocksPropsDataProps = {
  data: FeatureBlocksProps;
};
