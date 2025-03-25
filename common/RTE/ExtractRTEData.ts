type TextNode = {
    data: object;
    marks: unknown[];
    value: string;
    nodeType: string;
};

type ContentNode = {
    data: object;
    content: TextNode[];
    nodeType: string;
};

type RTEData = {
    "en-US"?: {
        data: object;
        content: ContentNode[];
        nodeType: string;
    };
};

export const extractPlainText = (rteData: RTEData): string => {
    if (!rteData || !rteData["en-US"] || !rteData["en-US"].content) return "";

    return rteData["en-US"].content
        ?.map(node => node.content.map(textNode => textNode.value).join(" "))
        ?.join("\n\n");
};
