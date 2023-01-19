import { AbstractContext } from "../contexts/AbstractContext";

export type Config<T> = Required<{
  [K in keyof T]:
    | null
    | ((
        value: NonNullable<T[K]>,
        level: number
      ) => string | (string | AbstractContext<any, any>)[]);
}>;

export abstract class AbstractDirective<T> {
  constructor(readonly spec: T) {}

  static renderValue(
    level: number,
    key: string,
    value: unknown,
    config?: Config<any>
  ) {
    const configCb = config?.[key];
    if (configCb) {
      value = configCb(value, level);
    }

    const values: any[] = [];

    if (typeof value === "boolean") {
      values.push(value ? "on" : "off");
    } else if (Array.isArray(value)) {
      values.push(...value);
    } else if (value && typeof value === "object") {
      for (const objectKey in value) {
        values.push(`${objectKey} ${(value as any)[objectKey]}`);
      }
    } else if (typeof value !== "undefined") {
      values.push(value);
    }

    const padding = " ".repeat(level * 2);
    return values
      .map((v) => {
        if (v instanceof AbstractContext) {
          return v.toString(level);
        } else {
          return `${padding}${key} ${v};`;
        }
      })
      .join("\n");
  }

  toString(level = 0) {
    const result: string[] = [];
    const config: Config<any> = (this as any)["constructor"]["config"];
    for (const key in this.spec) {
      const value = AbstractDirective.renderValue(
        level,
        key,
        this.spec[key],
        config
      );
      result.push(value);
    }
    return result.join("\n");
  }
}
