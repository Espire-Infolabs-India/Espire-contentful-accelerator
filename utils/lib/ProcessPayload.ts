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

interface EntryWithFields {
  fields?: ContentfulPayload;
}

// Utility function to flatten nested objects
const flattenObject = <T extends Record<string, unknown>>(
  obj: T,
  prefix = ""
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}_${key}` : key;
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        Object.assign(flattened, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
};

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
          output[key] = await getAssetByID(sysValue.id);
        } else if (sysValue.linkType === "Entry") {
          const entryData = await getEntryByID(sysValue.id);

          console.log("Entry Data Response:", JSON.stringify(entryData, null, 2));

          if (entryData && typeof entryData === "object" && "fields" in entryData) {
            const entryFields = (entryData as EntryWithFields).fields;

            if (entryFields) {
              console.log("Extracted Entry Fields:", entryFields);

              // Process and flatten the entry fields
              const processedFields = await ProcessPayload(entryFields);
              const flattenedFields = flattenObject(processedFields, "author");

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
