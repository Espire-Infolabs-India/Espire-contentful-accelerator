import { GetStaticProps } from "next";
import NotFound500 from "@/components/NotFound500/NotFound500";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import { getFooterData } from "@/common/getFooterData/getFooterData";

type PageProps = {
  headerData: ComponentProps;
  footerData: ComponentProps;
};

const Custom500 = ({ headerData, footerData }: PageProps): JSX.Element => {
  return <NotFound500 headerData={headerData} footerData={footerData} />;
};

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

export default Custom500;
