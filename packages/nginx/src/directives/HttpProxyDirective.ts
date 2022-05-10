import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpProxyDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
   */
  proxy_set_header?: Record<string, string>;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
   */
  proxy_pass?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffers
   */
  proxy_buffers?: [number, string];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffer_size
   */
  proxy_buffer_size?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout
   */
  proxy_read_timeout?: string;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_proxy_module.html#directives
 */
export class HttpProxyDirective extends AbstractDirective<HttpProxyDirectiveSpec> {
  static type = "httpProxy" as const;
  static config: Config<HttpProxyDirectiveSpec> = {
    proxy_buffer_size: null,
    proxy_buffers: (v) => v.join(" "),
    proxy_pass: null,
    proxy_read_timeout: null,
    proxy_set_header: null,
  };
}
