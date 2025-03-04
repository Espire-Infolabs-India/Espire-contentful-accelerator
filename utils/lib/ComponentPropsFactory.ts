import { HeroBannerProps } from "@/components/HeroBanner/HeroBannerProps";
import { ImageWithTitleDescriptionProps } from "@/components/ImageWithTitleDescription/ImageWithTitleDescriptionProps";
import { RichTextProps } from "@/components/RichText/RichTextProps";

export type ComponentPropsFactory = HeroBannerProps &
  ImageWithTitleDescriptionProps &
  RichTextProps;
