// Utility function to flatten nested objects up to a given depth level
export const FlattenObject = <T extends Record<string, unknown>>(
  obj: T,
  prefix = "",
  level: number = 1
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}_${key}` : key;
      const value = obj[key];

      if (typeof value === "object" && value !== null && level > 1) {
        // Recursively flatten the object until the given depth level is reached
        Object.assign(
          flattened,
          FlattenObject(value as Record<string, unknown>, newKey, level - 1)
        );
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
};
