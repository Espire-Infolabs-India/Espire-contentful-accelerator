import { extractPlainTextAsync, RTEData } from "@/common/RTE/ExtractRTEData";
import { getAssetByID } from "../utilityFunctions/getAssetByID";
import { getEntryByID } from "../utilityFunctions/getEntryByID";

type ContentfulPayload = Record<string, unknown>;

type SysLink = {
  sys: {
    type: "Link";
    linkType: "Asset" | "Entry";
    id: string;
  };
};

interface EntryWithAuthor {
  author?: {
    fields: ContentfulPayload;
  };
}


export const ProcessPayload = async (
  input: ContentfulPayload
): Promise<ContentfulPayload> => {
  const output: ContentfulPayload = {};

  for (const key in input) {
    const value = input[key];
    if (Array.isArray(value)) {
      output[key] = value.join(", "); // Flatten arrays to string
    } else if (typeof value === "object" && value !== null) {
      if (
        "content" in (value as { content?: unknown[] }) &&
        Array.isArray((value as { content?: unknown[] }).content)
      ) {
        output[key] = await extractPlainTextAsync(
          value as { content?: unknown[] } as unknown as RTEData
        );
      } else if (
        "sys" in (value as { sys?: SysLink["sys"] }) &&
        (value as { sys?: SysLink["sys"] }).sys
      ) {
        const sysValue = (value as { sys: SysLink["sys"] }).sys;
        if (sysValue.linkType === "Asset") {
          output[key] = await getAssetByID(sysValue.id);
        } else if (sysValue.linkType === "Entry") {
          const entryData = await getEntryByID(sysValue.id);
          if (entryData && (entryData as EntryWithAuthor).author?.fields) {
            const authorFields = (entryData as EntryWithAuthor).author?.fields;
            output[key] = await ProcessPayload(authorFields as ContentfulPayload);
          }
        }
      } else {
        output[key] = value; // Keep other objects as is
      }
    } else {
      output[key] = value; // Directly assign non-object values
    }
  }

  return output;
};
