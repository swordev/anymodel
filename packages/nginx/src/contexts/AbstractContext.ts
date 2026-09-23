import { ContextDirectiveConfig, directiveMap } from "../Directive.js";
import { AbstractDirective, Config } from "../directives/AbstractDirective.js";
import { formatCustomDirective } from "../utils/string.js";

export class AbstractContext<TSpec, TConfig = void> {
  type!: string;
  readonly data: TSpec[];
  readonly config!: TConfig;
  constructor(data?: TSpec[] | TSpec | string);
  constructor(config: TConfig, data?: TSpec[] | TSpec | string);
  constructor(
    configOrSpec: TConfig extends void ? TSpec[] | TSpec : TConfig,
    data?: Partial<TSpec>[] | TSpec | string,
  ) {
    if (arguments.length === 2) {
      this.config = configOrSpec as any;
      this.data = data as any;
    } else {
      this.data = configOrSpec as any;
    }
  }
  protected onName(): string | null {
    return this.type;
  }
  protected onRenderConfig() {
    return "";
  }
  protected render(level: number, block: string): string {
    const name = this.onName();
    const padding = " ".repeat(level * 2);
    let result: string = "";
    let config = this.onRenderConfig();
    if (config.length) config = ` ${config}`;
    if (name) result = `${padding}${name}${config} {\n`;
    result += block;
    if (name) result += `\n${padding}}`;
    return result;
  }

  static getDirectiveConfig(self: {
    constructor: {
      new (...args: unknown[]): AbstractContext<any>;
      directiveConfig?: ContextDirectiveConfig;
    };
  }) {
    return self.constructor.directiveConfig;
  }

  private findDirectiveConfig(directiveKey: string) {
    const selfDirectiveConfig = AbstractContext.getDirectiveConfig(this as any);
    for (const contextType in selfDirectiveConfig) {
      const directiveKeys = selfDirectiveConfig[
        contextType as keyof typeof selfDirectiveConfig
      ] as string[] | undefined;
      if (directiveKeys?.includes(directiveKey)) {
        return (directiveMap as any)[contextType]["config"] as Config<any>;
      }
    }
  }

  toString(inLevel = 0): string {
    const items = Array.isArray(this.data) ? this.data : [this.data];
    const level = this.onName()?.length ? inLevel + 1 : inLevel;
    return this.render(
      inLevel,
      items
        .flatMap((item) => {
          const result: string[] = [];
          if (item && typeof item === "object") {
            for (const key in item) {
              if (key.startsWith("$")) {
                const value = item[key] as any;
                result.push(formatCustomDirective(value, level));
              } else {
                const config = this.findDirectiveConfig(key);
                const value = AbstractDirective.renderValue(
                  level,
                  key,
                  item[key],
                  config,
                );
                result.push(value);
              }
            }
          } else {
            throw new Error(`Invalid value`);
          }
          return result;
        })
        .join("\n"),
    );
  }
}
