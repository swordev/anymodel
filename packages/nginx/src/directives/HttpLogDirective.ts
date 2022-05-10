import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpLogDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log
   */
  access_log?: string | false;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_log_module.html#log_format
   */
  log_format?: {
    name: string;
    escape?: "default" | "json" | "none";
    value: string[];
  };
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_log_module.html#directives
 */
export class HttpLogDirective extends AbstractDirective<HttpLogDirectiveSpec> {
  static type = "httpLog" as const;
  static config: Config<HttpLogDirectiveSpec> = {
    access_log: null,
    log_format: (v, level) => {
      const values = v.value.map((sv) => `'${sv}'`);
      const padding = " ".repeat(level * 2);
      const escape = v.escape ? ` escape=${v.escape} ` : " ";
      return `${v.name}${escape}${values.join(`\n${padding}`)}`;
    },
  };
}
