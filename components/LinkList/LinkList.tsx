import { LinkListLinksDataProps } from "./LinkListProps";

const LinkListItems = ({ data }: LinkListLinksDataProps) => {
  const linkListItems = data?.fields?.url;
  return (
    <div>
      <p>Title: {data?.fields?.title}</p>
      {linkListItems?.map((linklistitems, index) => {
        return (
          <div className="px-7" key={index}>
            <p>Title: {linklistitems?.fields?.title}</p>
            <p>URL: {linklistitems?.fields?.url}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LinkListItems;
