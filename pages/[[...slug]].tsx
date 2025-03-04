import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentPropsFactory } from "@/utils/lib/ComponentPropsFactory";

type PageProps = {
  content: ComponentPropsFactory[];
};

const DynamicPage = ({ content }: PageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {content?.map((data, index) => {
        const componentType = data.sys.contentType.sys.id;
        const Component = ComponentFactory[componentType];

        if (!Component) {
          console.warn(`Unknown component type: ${componentType}`);
          return null;
        }

        return <Component key={index} data={data} />;
      })}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: [] } },
    { params: { slug: ["about"] } },
    { params: { slug: ["blog", "example"] } },
  ],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  let slug = params?.slug ?? "home";
   slug = Array.isArray(slug)
    ? `${slug.map((slug) => slug.toLowerCase())}`
    : "home";
  const content = (await getEntriesByContentType(
    "landingPage",
    slug as string
  )) as unknown as ComponentPropsFactory;

  if (!content || !("items" in content) || !Array.isArray(content.items)) {
    return { notFound: true };
  }

  const componentContainer =
    content.items?.[0]?.fields?.componentContainer ?? [];

  return {
    props: {
      content: Array.isArray(componentContainer) ? componentContainer : [],
    },
    revalidate: 10,
  };
};

export default DynamicPage;
