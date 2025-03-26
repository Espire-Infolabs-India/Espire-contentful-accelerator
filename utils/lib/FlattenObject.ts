// Utility function to flatten nested objects
export const FlattenObject = <T extends Record<string, unknown>>(
  obj: T,
  prefix = ""
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}_${key}` : key;
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        Object.assign(
          flattened,
          FlattenObject(value as Record<string, unknown>, newKey)
        );
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
};
