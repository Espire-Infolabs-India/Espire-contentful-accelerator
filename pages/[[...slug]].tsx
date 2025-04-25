import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import { getFooterData } from "@/common/getFooterData/getFooterData";
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentProps } from "@/utils/lib/CommonProps";

type PageProps = {
  headerData: ComponentProps;
  footerData: ComponentProps;
};

const DynamicPage = ({ headerData, footerData }: PageProps) => {
  const router = useRouter();
  const [content, setContent] = useState<ComponentProps[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const lang =
        typeof window !== "undefined"
          ? localStorage.getItem("lang") || "en-US"
          : "en-US";
      const slugPath = router.asPath.replace(/^\/+/, "") || "home";

      const result = await getEntriesByContentType(
        "landingPage",
        slugPath,
        lang
      );

      if (result && typeof result === "object" && "items" in result) {
        const container = result.items?.[0]?.fields?.componentContainer;
        const componentContainer = Array.isArray(container)
          ? (container as ComponentProps[])
          : [];

        setContent(componentContainer);
      } else {
        setContent([]);
      }
    };

    fetchContent();
  }, [router.asPath]);

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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: [] } },
    { params: { slug: ["about"] } },
    { params: { slug: ["blog"] } },
  ],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<PageProps> = async () => {
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
      headerData,
      footerData,
    },
    revalidate: 10,
  };
};

export default DynamicPage;
