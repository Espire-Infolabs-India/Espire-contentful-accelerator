import { GetStaticProps, GetStaticPaths } from "next";
import NotFound from "@/components/NotFound/NotFound";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import { getFooterData } from "@/common/getFooterData/getFooterData";


type ContentfulItem = {
  fields: {
    componentContainer: ComponentProps[];
  };
};

type ContentfulEntryResponse = {
  items: ContentfulItem[];
};

type PageProps = {
  headerData: ComponentProps;
  footerData: ComponentProps;
};

const Custom404 = ({ headerData, footerData }: PageProps): JSX.Element => {
  return <NotFound headerData={headerData} footerData={footerData} />;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  locale,
}) => {
  const domain = process.env?.NEXT_PUBLIC_DOMAIN ?? "site1";
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
      headerData,
      footerData,
    },
    revalidate: 10,
  };
};

export default Custom404;
