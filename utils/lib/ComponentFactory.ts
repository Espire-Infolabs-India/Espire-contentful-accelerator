import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";
import FeatureBlocks from "@/components/FeatureBlocks/FeatureBlocks";
import Carousel from "@/components/Carousel/Carousel";
import { ComponentProps } from "./CommonProps";

export const ComponentFactory: Record<string, React.FC<{data : ComponentProps}>> = {
    heroBanner: HeroBanner,
    imageWithTitleDescription: ImageWithTitleDescription,
    richText: RichText,
    componentFeatureBlocks:FeatureBlocks,
    componentCarousel:Carousel
};