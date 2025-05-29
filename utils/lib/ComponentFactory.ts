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
import HeadScriptComponent from "@/components/HeadScript/HeadScript";
import Separator from "@/components/Separator/Separator";
import PlainHtml from "@/components/Plain Html/PlainHtml";
import GraphQLListing from "@/components/GraphQLListing/GraphQLListing";

export const ComponentFactory: Record<
  string,
  React.FC<{ data: ComponentProps }>
> = {
  heroBanner: HeroBanner,
  imageWithTitleDescription: ImageWithTitleDescription,
  richText: RichText,
  componentFeatureBlocks: FeatureBlocks,
  componentCarousel: Carousel,
  componentAccordion: Accordion,
  componentTabs: Tabs,
  componentMap: Map,
  componentFeatureCard: FeatureCard,
  componentContainer: Container,
  componentLisiting: ListingComponent,
  componentSocialMediaFeeds: SocialMediaFeeds,
  componentSocialMedia: SocialMedia,
  componentLinkList: LinkListItems,
  cta: CTA,
  componentHeadScript: HeadScriptComponent,
  componentSeparator :Separator,
  componentPlainHtml: PlainHtml,
  componentGraphQlListing: GraphQLListing
  // Add more components as needed
};
