import React, { ReactNode } from "react";
import { BLOCKS, INLINES, MARKS, Node } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const Bold = ({ children }: { children: ReactNode }) => (
  <span className="font-bold text-blue-500">{children}</span>
);

const Heading1 = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">
    <span className="text-4xl md:text-6xl font-bold">
      {children}
    </span>
  </div>
);

const Heading2 = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">
    <span className="text-3xl md:text-5xl font-bold">
      {children}
    </span>
  </div>
);
const Paragraph = ({ children }: { children: ReactNode }) => (
  <div className="mb-4 ">
    <p className=""> {children} </p>
  </div>
);

const HyperLNK = ({ node, children }: { node: Node; children: ReactNode }) => {
  const URI = node.data.uri;
  return (
    <span className="text-4xlx md:text-6xlx text-blue-200 font-bold">
      <a href={URI} target="_blank" rel="noreferrer">
        {children}
      </a>
    </span>
  );
};

// Rich Text Rendering Options
const RichtextRenderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
    [BLOCKS.HEADING_2]: (node, children) => <Heading2>{children}</Heading2>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      return <Image src={file.url} alt={title} width={600} height={400} />;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <HyperLNK node={node}> {children} </HyperLNK>
    ),
  },
};

export default RichtextRenderOptions;
