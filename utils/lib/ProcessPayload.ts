import { extractPlainTextAsync, RTEData } from "@/common/RTE/ExtractRTEData";
import { getAssetByID } from "../utilityFunctions/getAssetByID";
import { getEntryByID } from "../utilityFunctions/getEntryByID";
import { FlattenObject } from "./FlattenObject";

type ContentfulPayload = Record<string, unknown>;

type SysLink = {
  sys: {
    type: "Link";
    linkType: "Asset" | "Entry";
    id: string;
  };
};

interface EntryWithFields {
  fields?: ContentfulPayload;
}

// Main function to process payload
export const ProcessPayload = async (
  input: ContentfulPayload
): Promise<ContentfulPayload> => {
  const output: ContentfulPayload = {};

  for (const key in input) {
    const value = input[key];

    if (Array.isArray(value)) {
      output[key] = value.join(", "); // Flatten arrays to string
    } else if (typeof value === "object" && value !== null) {
      if ("content" in value && Array.isArray(value.content)) {
        output[key] = await extractPlainTextAsync(value as RTEData);
      } else if ("sys" in value && value.sys) {
        const sysValue = (value as SysLink).sys;

        if (sysValue.linkType === "Asset") {
          const imageData = await getAssetByID(sysValue.id);
          const imageFields = (imageData as unknown as EntryWithFields).fields;

          const processedImageFields = await ProcessPayload(
            imageFields as ContentfulPayload
          );
          const flattenedImageFields = FlattenObject(
            processedImageFields,
            "image"
          );

          // Instead of nesting under `author`, spread the properties into `output`
          Object.assign(output, flattenedImageFields);
        } else if (sysValue.linkType === "Entry") {
          const entryData = await getEntryByID(sysValue.id);

          if (
            entryData &&
            typeof entryData === "object" &&
            "fields" in entryData
          ) {
            const entryFields = (entryData as EntryWithFields).fields;

            if (entryFields) {
              console.log("Extracted Entry Fields:", entryFields);

              // Process and flatten the entry fields
              const processedFields = await ProcessPayload(entryFields);
              const flattenedFields = FlattenObject(processedFields, "author");

              // Instead of nesting under `author`, spread the properties into `output`
              Object.assign(output, flattenedFields);
            } else {
              console.warn(`No fields found for entry with ID: ${sysValue.id}`);
            }
          } else {
            console.warn(`Invalid entry structure for ID: ${sysValue.id}`);
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
