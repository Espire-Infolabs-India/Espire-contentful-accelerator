import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "@/components/Layout/Layout";
import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import { getFooterData } from "@/common/getFooterData/getFooterData";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { useRouter } from "next/router";
import getRedirects from "@/utils/lib/getRedirects";

type ContentfulItem = {
  fields: {
    componentContainer: ComponentProps[];
  };
};

type ContentfulEntryResponse = {
  items: ContentfulItem[];
};

type PageProps = {
  content: ComponentProps[];
  headerData: ComponentProps;
  footerData: ComponentProps;
};

const DynamicPage = ({ content, headerData, footerData }: PageProps) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <Layout headerData={headerData} footerData={footerData}>
      {content.map((data, index) => {
        const componentType = data.sys?.contentType?.sys?.id as string;
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: { slug: string[] }; locale: string }[] = [];

  const staticSlugs = ["about", "blog"];

  locales?.forEach((locale) => {
    paths.push({ params: { slug: [] }, locale });
    staticSlugs.forEach((slug) => {
      paths.push({ params: { slug: [slug] }, locale });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  locale,
}) => {
  const domain = process.env?.DOMAIN ?? 'site1';

  console.log("Domain :::: ", domain);
  let slug = params?.slug ?? `${domain}-home`;
  slug = Array.isArray(slug)
    ? slug.map((s) => s.toLowerCase()).join("/")
    : `${domain}-home`;
 
  const contentResponse = (await getEntriesByContentType(
    "landingPage",
    slug,
    locale,
    domain
    )) as unknown as ContentfulEntryResponse;
  if (
    !contentResponse ||
    !Array.isArray(contentResponse.items) ||
    contentResponse.items.length === 0
  ) {
    return { notFound: true };
  }
  const redirects = await getRedirects();
  const redirectMatch = redirects.find(
    (r) => r.source.toLowerCase() === `/${slug}`
  );

  if (redirectMatch) {
    return {
      redirect: {
        destination: redirectMatch.destination,
        permanent: redirectMatch.permanent,
      },
    };
  }
  const componentContainer =
    contentResponse.items[0].fields?.componentContainer ?? [];

  const headerResult = await getHeaderData();
  const footerResult = await getFooterData();

  const headerData =
    Array.isArray(headerResult?.data) && headerResult.data.length > 0
      ? headerResult.data[0]
      : ({} as ComponentProps);

  const footerData =
    Array.isArray(footerResult?.data) && footerResult.data.length > 0
      ? footerResult.data[0]
      : ({} as ComponentProps);

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
