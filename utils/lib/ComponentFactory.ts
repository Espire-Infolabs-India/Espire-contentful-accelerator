import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";
import { ComponentPropsFactory } from "./ComponentPropsFactory";
import FeatureBlocks from "@/components/FeatureBlocks/FeatureBlocks";
import AccordionExpandDefault from "@/components/Accordion/AccordionExpandDefault";

export const ComponentFactory: Record<
  string,
  React.FC<{ data: ComponentPropsFactory }>
> = {
  heroBanner: HeroBanner,
  imageWithTitleDescription: ImageWithTitleDescription,
  richText: RichText,
  componentFeatureBlocks: FeatureBlocks,
  componentAccordion: AccordionExpandDefault,
};
