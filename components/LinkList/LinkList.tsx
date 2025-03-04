import Link from "next/link";
import { LinkListLinksDataProps } from "./LinkListProps";

const LinkListItems = ({ data }: LinkListLinksDataProps) => {
  const linkListItems = data?.fields?.url;
  return (
    <div className="flex gap-4">
      {linkListItems?.map((linklistitems, index) => {
        return (
          <div key={index}>
            <ul>
              <li className="item0 odd first">
                <Link
                  href={linklistitems.fields.url}
                  title=""
                  target=""
                  className="text-white text-sm"
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
