import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import Layout from "@/components/Layout/Layout";
import { getFooterData } from "@/common/getFooterData/getFooterData";

type PageProps = {
  content: ComponentProps[];
  headerData: ComponentProps;
  footerData: ComponentProps;
};

const DynamicPage = ({ content, headerData, footerData }: PageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout headerData={headerData} footerData={footerData}>
      {content?.map((data, index) => {
        const componentType = data.sys.contentType.sys.id as string;
        const Component = ComponentFactory[componentType];

        if (!Component) {
          console.warn(`Unknown component type: ${componentType}`);
          return null;
        }

        return <Component key={index} data={data} />;
      })}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: [] } },
    { params: { slug: ["about"] } },
    { params: { slug: ["blog"] } },
  ],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  let slug = context.params?.slug ?? "home";


  // const host = context.req?.headers?.host 

  // console.log("Hpost", host);
  slug = Array.isArray(slug)
    ? `${slug.map((slug) => slug.toLowerCase())}`
    : "home";
  const content = (await getEntriesByContentType(
    "landingPage",
    slug as string,
    "site1"
  )) as unknown as ComponentProps[];

  if (!content || !("items" in content) || !Array.isArray(content.items)) {
    return { notFound: true };
  }

  const componentContainer =
    content.items?.[0]?.fields?.componentContainer ?? [];

  const headerResult = await getHeaderData();

  const headerData =
    Array.isArray(headerResult?.data) && headerResult.data.length > 0
      ? headerResult.data[0]
      : null;

  const footerResult = await getFooterData();

  const footerData =
    Array.isArray(footerResult?.data) && footerResult.data.length > 0
      ? footerResult.data[0]
      : null;
  return {
    props: {
      content: Array.isArray(componentContainer) ? componentContainer : [],
      headerData,
      footerData,
    },
    revalidate: 10,
  };
};

export default DynamicPage;
