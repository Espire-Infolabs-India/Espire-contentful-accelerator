import Link from "next/link";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const LinkListItems = ({ data }: ComponentDataProps) => {
  const linkListItems = data?.fields?.url;
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {linkListItems?.map((linklistitems: ComponentProps, index: number) => {
        return (
          <div key={index}>
            <ul>
              <li className="item0 odd first">
                <Link
                  href={linklistitems.fields.url}
                  title=""
                  target=""
                  className="text-white"
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
