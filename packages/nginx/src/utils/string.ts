export function formatValue(value: string, level: number) {
  const padding = " ".repeat(level * 2);
  return value
    .split("\n")
    .map((line) => padding + line)
    .join("\n");
}
