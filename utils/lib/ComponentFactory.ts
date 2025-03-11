import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";
import { ComponentPropsFactory } from "./ComponentPropsFactory";
import FeatureBlocks from "@/components/FeatureBlocks/FeatureBlocks";
import Accordion from "@/components/Accordion/Accordion";

export const ComponentFactory: Record<
  string,
  React.FC<{ data: ComponentPropsFactory }>
> = {
  heroBanner: HeroBanner,
  imageWithTitleDescription: ImageWithTitleDescription,
  richText: RichText,
  componentFeatureBlocks: FeatureBlocks,
  componentAccordion: Accordion,
};
