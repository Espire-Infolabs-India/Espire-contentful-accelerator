type Payload = {
    title?: string;
    shortDescription?: string;
    blogContent?: unknown;
    image?: string;
    url?: string;
    author?: string;
    publishDate?: string;
    tags?: string[];
  };
  
export const parseJSONSafely = async (
    jsonString: string,
    timeoutMs = 500
  ): Promise<Payload> => {
    return Promise.race([
      new Promise<Payload>((resolve) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (typeof parsed === "object" && parsed !== null) {
            resolve(parsed as Payload);
          } else {
            console.warn(
              "⚠️ Parsed JSON is not an object, returning empty object."
            );
            resolve({} as Payload);
          }
        } catch (error) {
          console.error("❌ JSON Parsing Error:", error);
          resolve({} as Payload);
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("JSON parse timeout")), timeoutMs)
      ),
    ]);
  };
  
  