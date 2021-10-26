export function isArrayOfString(arg: unknown): arg is string[] {
  return Array.isArray(arg) && arg.every(i => (typeof i === "string"));
}
