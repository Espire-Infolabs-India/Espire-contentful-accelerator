type TextNode = {
  data: object;
  marks: unknown[];
  value: string;
  nodeType: string;
};
type ContentNode = { data: object; content: TextNode[]; nodeType: string };
export type RTEData = {
  [x: string]: (ContentNode | TextNode)[];
};


export const extractPlainTextAsync = async (
  rteData: RTEData
): Promise<string> => {

  if (!rteData?.content || !Array.isArray(rteData.content)) {
    console.warn("⚠️ Invalid or missing RTE content.");
    return "";
  }

  const extractText = (nodes: Array<ContentNode | TextNode>): string => {
    return nodes
      .map((node) => {
        if ("value" in node && typeof node.value === "string") {
          return node.value.trim(); // Extract text values
        }
        if ("content" in node && Array.isArray(node.content)) {
          return extractText(node.content); // Recursively extract from child nodes
        }
        return "";
      })
      .join(" ")
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();
  };

  return extractText(rteData.content);
};
