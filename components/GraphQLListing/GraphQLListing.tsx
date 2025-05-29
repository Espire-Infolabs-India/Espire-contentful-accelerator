import { ComponentDataProps } from "@/utils/lib/CommonProps";
import { useEffect, useState } from "react";

type Entry = {
  id: string;
  title: string;
  url?: string; // link to the page
  image?: string; // image for the card background
};

const GraphQLListing = ({ data }: ComponentDataProps) => {
  const { dataSourceName, scope, displayCount, loadMoreBehavior, variant } =
    data?.fields || {};

  const behavior = Array.isArray(loadMoreBehavior)
    ? loadMoreBehavior[0]?.toLowerCase()
    : loadMoreBehavior?.toLowerCase();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(displayCount);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql-fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: scope }),
      });
      const result = await res.json();
      setEntries(result.entries || []);
      console.log("");
    };

    if (scope) fetchData();
  }, [scope]);

  useEffect(() => {
    if (behavior === "lazy loading" || behavior === "lazyloading") {
      const onScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300
        ) {
          setVisibleCount((prev) => prev + displayCount);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [behavior, displayCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + displayCount);
  };

  const renderedEntries = entries?.slice(0, visibleCount);

  return (
    <section className={`listing-component variant-${variant} py-8 px-4`}>
      {dataSourceName && (
        <h2 className="text-3xl font-bold mb-6">{dataSourceName}</h2>
      )}

      <div className="flex flex-wrap gap-6">
        {renderedEntries.map((entry, index) => (
          <div
            key={entry?.id}
            className="w-[300px] h-[400px] rounded-xl overflow-hidden relative shadow-md flex items-end bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                entry?.image || `https://picsum.photos/seed/${index}/600/400`
              })`,
            }}
          >
            <div className="bg-indigo-900/70 text-white w-full p-4">
              <h3 className="text-lg font-semibold m-0">{entry?.title}</h3>
              <a
                href={entry?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 border border-white text-white hover:bg-white hover:text-indigo-900 transition rounded"
              >
                READ MORE
              </a>
            </div>
          </div>
        ))}
      </div>

      {behavior === "show more" && visibleCount < entries?.length && (
        <div className="mt-8">
          <button
            onClick={handleShowMore}
            className="bg-indigo-900 text-white px-6 py-3 rounded hover:bg-indigo-800 transition"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </section>
  );
};

export default GraphQLListing;
