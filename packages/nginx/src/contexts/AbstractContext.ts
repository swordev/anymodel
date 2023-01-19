import { ContextDirectiveConfig, directiveMap } from "../Directive";
import { AbstractDirective, Config } from "../directives/AbstractDirective";

export class AbstractContext<TSpec, TConfig = void> {
  type!: string;
  readonly data: TSpec[];
  readonly config!: TConfig;
  constructor(data?: TSpec[] | TSpec);
  constructor(config: TConfig, data?: TSpec[] | TSpec);
  constructor(
    configOrSpec: TConfig extends void ? TSpec[] | TSpec : TConfig,
    data?: Partial<TSpec>[] | TSpec
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
        return directiveMap[contextType as keyof typeof selfDirectiveConfig][
          "config"
        ] as Config<any>;
      }
    }
  }

  toString(level = 0): string {
    const items = Array.isArray(this.data) ? this.data : [this.data];
    return this.render(
      level,
      items
        .flatMap((item) => {
          const result: string[] = [];
          if (item && typeof item === "object") {
            for (const key in item) {
              const config = this.findDirectiveConfig(key);
              const value = AbstractDirective.renderValue(
                this.onName()?.length ? level + 1 : level,
                key,
                item[key],
                config
              );
              result.push(value);
            }
          } else {
            throw new Error(`Invalid value`);
          }
          return result;
        })
        .join("\n")
    );
  }
}
