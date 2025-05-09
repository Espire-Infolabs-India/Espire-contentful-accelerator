import Link from "next/link";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const makeAbsolute = (url: string): string =>
  url?.startsWith("/") ? url : `/${url}`;

const LinkListItems = ({ data }: ComponentDataProps) => {
  const linkListItems = data?.fields?.url;

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {linkListItems?.map((linklistitems: ComponentProps, index: number) => {
        return (
          <div key={index}>
            <ul>
              <li className="item0 odd first link-list">
                <Link
                  href={makeAbsolute(linklistitems.fields.url)}
                  title=""
                  target=""
                  className="sub-menu"
                >
                  {linklistitems.fields.title}
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
