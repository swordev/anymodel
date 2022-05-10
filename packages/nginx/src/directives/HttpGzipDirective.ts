import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpGzipDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip
   */
  gzip?: boolean;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_buffers
   */
  gzip_buffers?: [number, string];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_comp_level
   */
  gzip_comp_level?: number;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_disable
   */
  gzip_disable?: string | string[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_http_version
   */
  gzip_http_version?: string | string[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_min_length
   */
  gzip_min_length?: number;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_proxied
   */
  gzip_proxied?:
    | false
    | "expired"
    | "no-cache"
    | "no-store"
    | "private"
    | "no_last_modified"
    | "no_etag"
    | "auth"
    | "any";
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types
   */
  gzip_types?: string[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_vary
   */
  gzip_vary?: boolean;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_gzip_module.html#directives
 */
export class HttpGzipDirective extends AbstractDirective<HttpGzipDirectiveSpec> {
  static type = "httpGzip" as const;
  static config: Config<HttpGzipDirectiveSpec> = {
    gzip: null,
    gzip_buffers: (v) => v.join(" "),
    gzip_comp_level: null,
    gzip_disable: (v) => (typeof v === "string" ? v : v.join(" ")),
    gzip_http_version: (v) => (typeof v === "string" ? v : v.join(" ")),
    gzip_min_length: null,
    gzip_proxied: null,
    gzip_types: (v) => (typeof v === "string" ? v : v.join(" ")),
    gzip_vary: null,
  };
}
