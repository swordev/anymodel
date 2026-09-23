import type { CustomDirectiveValue } from "../directives/CustomDirective.js";

export function formatValue(value: string, level: number) {
  const padding = " ".repeat(level * 2);
  return value
    .split("\n")
    .map((line) => padding + line)
    .join("\n");
}

export function formatCustomDirective(
  input: CustomDirectiveValue | CustomDirectiveValue[],
  level: number,
) {
  const values = Array.isArray(input) ? input : [input];
  return values
    .filter((v) => typeof v === "string" || typeof v === "number")
    .map((v) => formatValue(v.toString(), level))
    .join("\n");
}
