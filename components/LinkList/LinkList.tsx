import Link from "next/link";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";
import { makeRelativeURL } from "@/utils/utilityFunctions/makeRelativeURL";

const LinkListItems = ({ data }: ComponentDataProps) => {
  const linkListItems = data?.fields?.url;
  console.log(linkListItems);
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {linkListItems?.map((linklistitems: ComponentProps, index: number) => {
        return (
          <div key={index}>
            <ul>
              <li className="item0 odd first link-list">
                <Link
                  href={makeRelativeURL(linklistitems?.fields?.url)}
                  title=""
                  target=""
                  className="sub-menu"
                >
                  {linklistitems?.fields?.title}
                </Link>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default LinkListItems;
