import { getHomePageStaticProps } from "@/common/getPageData/HomePage/getHomePageData";
import {
  HomePageComponentsProps,
  HomePageProps,
} from "@/common/getPageData/HomePage/HomePageProps";
import Footer from "@/components/Footer/Footer";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ImageWithTitleDescription from "@/components/ImageWithTitleDescription/ImageWithTitleDescription";
import RichText from "@/components/RichText/RichText";

//This is key value pair of component content type and its respective component
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
  return (
    <>
      {components.map((component, index) => {
        const Component =
          HomePageComponents[component?.sys?.contentType?.sys?.id]; // This is to get the component based on the content type component[key] will give the component
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
