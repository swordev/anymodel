import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpFastcgiDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_pass
   */
  fastcgi_pass?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_index
   */
  fastcgi_index?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param
   */
  fastcgi_param?: Record<string, string>;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_read_timeout
   */
  fastcgi_read_timeout?: string;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#directives
 */
export class HttpFastcgiDirective extends AbstractDirective<HttpFastcgiDirectiveSpec> {
  static type = "httpFastcgi" as const;
  static config: Config<HttpFastcgiDirectiveSpec> = {
    fastcgi_index: null,
    fastcgi_param: null,
    fastcgi_pass: null,
    fastcgi_read_timeout: null,
  };
}
