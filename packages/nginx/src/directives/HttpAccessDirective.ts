import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpAccessDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_access_module.html#allow
   */
  allow?: string | string[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_access_module.html#deny
   */
  deny?: string | string[];
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_access_module.html#directives
 */
export class HttpAccessDirective extends AbstractDirective<HttpAccessDirectiveSpec> {
  static type = "httpAccess" as const;
  static config: Config<HttpAccessDirectiveSpec> = {
    allow: null,
    deny: null,
  };
}
