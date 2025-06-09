import dynamic from "next/dynamic";
import { ComponentProps } from "./CommonProps";
import React from "react";

export const ComponentFactory: Record<
  string,
  React.ComponentType<{ data: ComponentProps }>
> = {
  heroBanner: dynamic(() => import("@/components/HeroBanner/HeroBanner")),
  imageWithTitleDescription: dynamic(() =>
    import("@/components/ImageWithTitleDescription/ImageWithTitleDescription")
  ),
  richText: dynamic(() => import("@/components/RichText/RichText")),
  componentFeatureBlocks: dynamic(() =>
    import("@/components/FeatureBlocks/FeatureBlocks")
  ),
  componentCarousel: dynamic(() => import("@/components/Carousel/Carousel")),
  componentAccordion: dynamic(() => import("@/components/Accordion/Accordion")),
  componentTabs: dynamic(() => import("@/components/Tabs/Tabs")),
  componentMap: dynamic(() => import("@/components/Map/Map")),
  componentFeatureCard: dynamic(() => import("@/components/FeatureCard/FeatureCard")),
  componentContainer: dynamic(() => import("@/components/Container/Container")),
  componentLisiting: dynamic(() => import("@/components/Lisiting/Lisitng")),
  componentSocialMediaFeeds: dynamic(() =>
    import("@/components/SocialMedia/SocialMediaFeeds")
  ),
  componentSocialMedia: dynamic(() =>
    import("@/components/SocialMedia/SocialMedia")
  ),
  componentLinkList: dynamic(() => import("@/components/LinkList/LinkList")),
  cta: dynamic(() => import("@/components/CTA/CTA")),
  componentHeadScript: dynamic(() => import("@/components/HeadScript/HeadScript")),
  componentSeparator: dynamic(() => import("@/components/Separator/Separator")),
  componentPlainHtml: dynamic(() => import("@/components/Plain Html/PlainHtml")),
  componentGraphQlListing: dynamic(() =>
    import("@/components/GraphQLListing/GraphQLListing")
  ),
  componentExternalApiResults: dynamic(() =>
    import("@/components/ExternalApiResults/ExternalApiReslts")
  ),
};
