import { FooterProps } from "@/components/Footer/FooterProps";
import { HeroBannerProps } from "@/components/HeroBanner/HeroBannerProps";
import { ImageWithTitleDescriptionProps } from "@/components/ImageWithTitleDescription/ImageWithTitleDescriptionProps";
import { RichTextProps } from "@/components/RichText/RichTextProps";

export type HomePageProps = {
  page: {
    fields: {
      componentContainer: HomePageComponentsProps[];
      title: string;
      url: string;
    };
  }[];
};

export type HomePageComponentsProps = HeroBannerProps &
  ImageWithTitleDescriptionProps &
  RichTextProps &
  FooterProps;
