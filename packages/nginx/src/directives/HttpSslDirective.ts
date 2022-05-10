import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpSslDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate
   */
  ssl_certificate?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate_key
   */
  ssl_certificate_key?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_cache
   */
  ssl_session_cache?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_timeout
   */
  ssl_session_timeout?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_session_tickets
   */
  ssl_session_tickets?: boolean;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_ssl_module.html#directives
 */
export class HttpSslDirective extends AbstractDirective<HttpSslDirectiveSpec> {
  static type = "httpSsl" as const;
  static config: Config<HttpSslDirectiveSpec> = {
    ssl_certificate: null,
    ssl_certificate_key: null,
    ssl_session_cache: null,
    ssl_session_tickets: null,
    ssl_session_timeout: null,
  };
}
