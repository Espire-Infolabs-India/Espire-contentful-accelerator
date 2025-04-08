import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";
import FeatureBlocks from "@/components/FeatureBlocks/FeatureBlocks";
import Carousel from "@/components/Carousel/Carousel";
import { ComponentProps } from "./CommonProps";
import Accordion from "@/components/Accordion/Accordion";
import Tabs from "@/components/Tabs/Tabs";
import Map from "@/components/Map/Map";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import Container from "@/components/Container/Container";
import ListingComponent from "@/components/Lisiting/Lisitng";
import SocialMediaFeeds from "@/components/SocialMedia/SocialMediaFeeds";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import LinkListItems from "@/components/LinkList/LinkList";
import CTA from "@/components/CTA/CTA";

export const ComponentFactory: Record<string, React.FC<{data : ComponentProps}>> = {
    heroBanner: HeroBanner,
    imageWithTitleDescription: ImageWithTitleDescription,
    richText: RichText,
    componentFeatureBlocks:FeatureBlocks,
    componentCarousel:Carousel,
    componentAccordion: Accordion,
    componentTabs: Tabs,
    componentMap : Map,
    componentFeatureCard: FeatureCard,
    componentContainer: Container,
    componentLisiting: ListingComponent,
    componentSocialMediaFeeds:SocialMediaFeeds,
    componentSocialMedia:SocialMedia,
    componentLinkList:LinkListItems,
    cta:CTA
    // Add more components as needed
};