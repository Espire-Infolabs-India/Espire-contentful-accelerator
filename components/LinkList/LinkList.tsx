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
                <a
                  title=""
                  target=""
                  className=""
                  href={linklistitems.fields.url}
                >
                  {linklistitems.fields.title}
                </a>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default LinkListItems;
