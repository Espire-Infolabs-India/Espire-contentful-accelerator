import React, { useEffect } from "react";
import {
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Configure,
  useSearchBox,
} from "react-instantsearch";
import alogoliaClient from "@/utils/lib/algoliaClient";
import Image from "next/image";
import type { Payload } from "@/utils/lib/ParseJSONData";
import type { Hit } from "instantsearch.js/es/types";
import { useRouter } from "next/router";
import Link from "next/link";

type BaseHit = Record<string, unknown>;

const Tag = ({ label }: { label: string }) => (
  <span className="inline-block bg-gray-200 text-xs text-gray-700 px-2.5 py-1 rounded-md">
    {label}
  </span>
);

const Hit = ({ hit }: { hit: Payload }) => {
  const tags: string[] = Array.isArray(hit.tags)
    ? hit.tags
    : typeof hit.tags === "string"
    ? hit.tags.split(",").map((tag) => tag.trim())
    : [];

  const formattedDate = hit.publishDate
    ? new Date(hit.publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const imageUrl = hit.image_file?.url || "";
  const altTitle = hit.title || "";

  if (
    !(
      imageUrl ||
      hit?.title ||
      hit?.shortDescription ||
      formattedDate ||
      (tags && tags.length > 0)
    )
  ) {
    return null;
  }

  return (
    <Link href={hit?.url ? `/blog/${hit.url}` : "#"}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full min-h-[450px] border border-gray-100 cursor-pointer">
        {imageUrl && (
          <div className="relative w-full h-48 check1222Atul">
            <Image
              src={imageUrl}
              alt={altTitle}
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          {hit?.title && (
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              <Highlight
                attribute="title"
                hit={hit as unknown as Hit<BaseHit>}
              />
            </h2>
          )}

          {hit?.shortDescription && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {hit.shortDescription}
            </p>
          )}

          {formattedDate && (
            <p className="text-xs text-gray-500 mb-4">{formattedDate}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, index) => (
                <Tag key={index} label={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const SearchWithUrlSync = () => {
  const router = useRouter();
  const { refine } = useSearchBox();

  const queryFromUrl =
    typeof router.query.search === "string" ? router.query.search : "";

  useEffect(() => {
    refine(queryFromUrl);
  }, [queryFromUrl, refine]);

  return null;
};
const ListingComponent = () => {
  const indexname = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
  return (
    <InstantSearch searchClient={alogoliaClient} indexName={indexname} insights>
      <div className="bg-gray-50 min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex justify-center mb-6 mt-2">
            <div className="relative w-full max-w-2xl">
              <SearchWithUrlSync />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                  />
                </svg>
              </div>
            </div>

            <Configure hitsPerPage={10} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1 bg-white p-5 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">
                Filter by Tag
              </h3>
              <RefinementList attribute="tags" />
            </aside>

            <main className="lg:col-span-3">
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
                  item: "list-none",
                }}
              />
            </main>
          </div>

          <div className="flex justify-center">
            <Pagination
              classNames={{
                list: "flex gap-2",
                item: "border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100",
                selectedItem: "bg-blue-500 text-white",
                disabledItem: "opacity-50 cursor-not-allowed",
              }}
            />
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};

export default ListingComponent;
