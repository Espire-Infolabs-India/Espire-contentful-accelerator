import { FeatureBlocksProps } from "@/components/FeatureBlocks/FeatureBlocksProps";
import { HeroBannerProps } from "@/components/HeroBanner/HeroBannerProps";
import { ImageWithTitleDescriptionProps } from "@/components/ImageWithTitleDescription/ImageWithTitleDescriptionProps";
import { RichTextProps } from "@/components/RichText/RichTextProps";
import { AccordionProps } from "@/components/Accordion/AccordionProps";

export type ComponentPropsFactory = HeroBannerProps &
  ImageWithTitleDescriptionProps &
  RichTextProps &
  FeatureBlocksProps &
  AccordionProps;
