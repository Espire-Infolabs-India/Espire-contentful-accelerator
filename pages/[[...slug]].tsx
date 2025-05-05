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
  publicURL: string;
};

const DynamicPage = ({ content, headerData, footerData,publicURL }: PageProps) => {
  const router = useRouter();

 
  // const { publicRuntimeConfig: { sites } } = getConfig()

  // console.log("Sites Checkkkkkkkkkkkkk:", sites); // Debugging line to check the sites object

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout headerData={headerData} footerData={footerData}>
       <h1>PUBLIC URL :::: {publicURL}</h1>
       <h1>LOCALE :::: {router.locale}</h1>
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
    { params: { slug: [] }, locale: "site1"},
    { params: { slug: ["about"] }, locale: "site1"},
    { params: { slug: ["blog"] }, locale: "site1"},
  ],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { locale, params } = context; 
  console.log("Locale based on domain:", locale); 
  const publicURL = process.env.PUBLIC_URL

  console.log("Publick IRL",process.env.PUBLIC_URL); // Debugging line to check the environment variable
  let slug = params?.slug ?? `${locale}-home`;

// Debugging line to check the slug
  slug = Array.isArray(slug)
    ? `${slug.map((slug) => slug.toLowerCase())}`
    : `${locale}-home`;

    console.log("Slug:", slug); 

  // Fetch data based on the locale (which is tied to the domain)
  const content = (await getEntriesByContentType(
    "landingPage",
    slug as string,
    locale 
  )) as unknown as ComponentProps[];

  console.log("content ",content)

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
      publicURL: publicURL || '',
    },
    revalidate: 10,
  };
};

export default DynamicPage;
