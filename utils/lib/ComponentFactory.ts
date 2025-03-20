import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";
import FeatureBlocks from "@/components/FeatureBlocks/FeatureBlocks";
import Carousel from "@/components/Carousel/Carousel";
import { ComponentProps } from "./CommonProps";
import Accordion from "@/components/Accordion/Accordion";
import Tabs from "@/components/Tabs/Tabs";
import Container  from "@/components/Container/Container";

export const ComponentFactory: Record<string, React.FC<{data : ComponentProps}>> = {
    heroBanner: HeroBanner,
    imageWithTitleDescription: ImageWithTitleDescription,
    richText: RichText,
    componentFeatureBlocks:FeatureBlocks,
    componentCarousel:Carousel,
    componentAccordion: Accordion,
    componentTabs: Tabs,
    componentSection: Container
};