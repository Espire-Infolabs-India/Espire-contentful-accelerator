import { getHomePageStaticProps } from "@/common/getPageData/HomePage/getHomePageData";
import {
  HomePageComponentsProps,
  HomePageProps,
} from "@/common/getPageData/HomePage/HomePageProps";
import Footer from "@/components/Footer/Footer";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";

const HomePageComponents: Record<
  string,
  React.FC<{ data: HomePageComponentsProps }>
> = {
  heroBanner: HeroBanner,
  imageWithTitleDescription: ImageWithTitleDescription,
  richText: RichText,
  componentFooter: Footer,
};

export default function Home({ page }: HomePageProps) {
  const components = page?.[0]?.fields?.componentContainer ?? [];
  console.log("components", components);
  return (
    <>
      {components.map((component, index) => {
        const Component =
          HomePageComponents[component?.sys?.contentType?.sys?.id];
        return (
          <div className="px-7" key={index}>
            <Component key={index} data={component} />
          </div>
        );
      })}
    </>
  );
}

export { getHomePageStaticProps as getStaticProps };
