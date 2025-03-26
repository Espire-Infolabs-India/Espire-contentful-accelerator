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
      output[key] = value.join(", "); // Flatten arrays to a string
    } else if (typeof value === "object" && value !== null) {
      if (
        "content" in (value as { content?: unknown[] }) &&
        Array.isArray((value as { content?: unknown[] }).content)
      ) {
        output[key] = await extractPlainTextAsync(value as unknown as RTEData);
      } else if (
        "sys" in (value as { sys?: SysLink["sys"] }) &&
        (value as { sys?: SysLink["sys"] }).sys
      ) {
        const sysValue = (value as { sys: SysLink["sys"] }).sys;

        if (sysValue.linkType === "Asset") {
          output[key] = await getAssetByID(sysValue.id);
        } else if (sysValue.linkType === "Entry") {
          const entryData = await getEntryByID(sysValue.id);

          console.log("Entry Data Response:", JSON.stringify(entryData, null, 2));

          if (entryData && typeof entryData === "object" && "fields" in entryData) {
            const authorFields = entryData.fields as Record<string, EntryWithAuthor>;

            if (authorFields) {
              console.log("Extracted Author Fields:", authorFields);

              // Keep the original keys unchanged
              const authorData = await ProcessPayload(authorFields);

              const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, string> => {
                const flattened: Record<string, string> = {};
              
                for (const key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const newKey = prefix ? `${prefix}_${key}` : key;
              
                    if (typeof obj[key] === "object" && obj[key] !== null) {
                      Object.assign(flattened, flattenObject(obj[key] as Record<string, unknown>, newKey));
                    } else {
                      flattened[newKey] = String(obj[key]);
                    }
                  }
                }
              
                return flattened;
              };
              output[key] = flattenObject(authorData as unknown as ContentfulPayload, "author");
            } else {
              console.warn(`No fields found for entry with ID: ${sysValue.id}`);
              output[key] = null;
            }
          } else {
            console.warn(`Invalid entry structure for ID: ${sysValue.id}`);
            output[key] = null;
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
