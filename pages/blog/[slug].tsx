import { GetStaticPaths, GetStaticProps } from "next";
import { getEntriesByContentType } from "@/utils/utilityFunctions/getEntriesByContentType";
import { getHeaderData } from "@/common/getHeaderData/getHeaderData";
import { getFooterData } from "@/common/getFooterData/getFooterData";
import { ComponentProps } from "@/utils/lib/CommonProps";
import { useRouter } from "next/router";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";

type ContentfulItem = {
  fields: {
    url?: string;
    tags?: string[];
    title?: string;
    description?: string | Document;
    content?: string | Document;
    image?: {
      fields: {
        file: { url: string };
      };
    };
    author?: {
      fields: {
        name: string;
      };
    };
    publishDate?: string;
  };
};

type ContentfulEntryResponse = {
  items: ContentfulItem[];
};
type PageProps = {
  headerData: ComponentProps;
  footerData: ComponentProps;
  title?: string;
  description?: string | Document;
  imageUrl?: string;
  authorName?: string;
  publishDate?: string;
  content?: string | Document;
  tags?: string[];
};

const BlogDynamicPage = ({
  title,
  description,
  imageUrl,
  authorName,
  publishDate,
  content,
  tags,
}: PageProps) => {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      {(imageUrl || title || description || authorName || publishDate) && (
        <section className="relative w-full h-[500px] overflow-hidden">
          {imageUrl && (
            <Image
              src={`https:${imageUrl}`}
              className="w-full h-full object-cover"
              width={600}
              height={400}
              alt=""
              unoptimized
            />
          )}

          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl max-w-xl z-10">
            {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}

            {description && typeof description === "object" ? (
              <div className="text-base text-gray-800 mb-4 leading-relaxed">
                {documentToReactComponents(description, RichtextRenderOptions)}
              </div>
            ) : (
              description && (
                <p className="text-base text-gray-800 mb-4 leading-relaxed">
                  {description}
                </p>
              )
            )}

            {(authorName || publishDate) && (
              <p className="italic text-sm text-gray-600">
                {authorName && <span>{authorName}</span>}
                {publishDate && (
                  <>
                    {" "}
                    ·{" "}
                    {new Date(publishDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </>
                )}
              </p>
            )}
          </div>
        </section>
      )}

      {(content || tags) && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          {content && typeof content === "object" ? (
            <div className="prose prose-lg max-w-none text-gray-800">
              {documentToReactComponents(content, RichtextRenderOptions)}
            </div>
          ) : (
            content && (
              <p className="text-base text-gray-800 leading-relaxed">
                {content}
              </p>
            )
          )}

          {tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  locale,
}) => {
  const slug = params?.slug as string;

  if (slug.toLowerCase() === "blog") {
    return { notFound: true };
  }

const domain = process.env.NEXT_PUBLIC_DOMAIN || "site1";
  const contentResponse = (await getEntriesByContentType(
    "blogLandingPage",
    slug,
    locale,
    domain
  )) as unknown as ContentfulEntryResponse;

  if (!contentResponse?.items?.length) {
    return { notFound: true };
  }

  const firstItem = contentResponse.items[0];
  const title = firstItem.fields?.title ?? "";
  const description = firstItem.fields?.description ?? "";
  const imageUrl = firstItem.fields?.image?.fields?.file?.url ?? "";
  const authorName = firstItem.fields?.author?.fields?.name ?? "";
  const publishDate = firstItem.fields?.publishDate ?? "";
  const content = firstItem.fields?.content ?? "";
  const tags =
    Array.isArray(firstItem.fields?.tags) && firstItem.fields.tags.length > 0
      ? firstItem.fields.tags
      : [];

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
      title,
      description,
      imageUrl,
      authorName,
      publishDate,
      content,
      tags,
    },
    revalidate: 10,
  };
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  const locales = context.locales ?? [];
  const paths: { params: { slug: string }; locale: string }[] = [];

  const staticSlugs = ["blog"];

  const contentResponse = await getEntriesByContentType("blogLandingPage");
  const items =
    contentResponse && Array.isArray(contentResponse.items)
      ? contentResponse.items
      : [];

  for (const locale of locales) {
    for (const item of items) {
      const rawSlug = item?.fields?.url;

      if (typeof rawSlug !== "string") continue;
      if (staticSlugs.includes(rawSlug.toLowerCase())) continue;
      if (rawSlug.includes("/")) continue;

      paths.push({
        params: { slug: rawSlug },
        locale,
      });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export default BlogDynamicPage;
