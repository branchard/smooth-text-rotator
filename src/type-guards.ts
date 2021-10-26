export function isArrayOfString(arg: any): arg is string[] {
  return Array.isArray(arg) && arg.every(i => (typeof i === "string"));
}
