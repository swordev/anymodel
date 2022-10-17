import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpHeadersDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header
   */
  add_header?: Record<string, string>;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_trailer
   */
  add_trailer?: Record<string, string>;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_headers_module.html#expires
   */
  expires?: string;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_headers_module.html#directives
 */
export class HttpHeadersDirective extends AbstractDirective<HttpHeadersDirectiveSpec> {
  static type = "httpHeaders" as const;
  static config: Config<HttpHeadersDirectiveSpec> = {
    add_header: null,
    add_trailer: null,
    expires: null,
  };
}
