import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpIndexDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_index_module.html#index
   */
  index?: string | string[];
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#directives
 */
export class HttpIndexDirective extends AbstractDirective<HttpIndexDirectiveSpec> {
  static type = "httpIndex" as const;
  static config: Config<HttpIndexDirectiveSpec> = {
    index: (v) => (typeof v === "string" ? v : v.join(" ")),
  };
}
