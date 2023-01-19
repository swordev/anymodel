import { HttpContext, HttpContextDirectiveSpec } from "../contexts/HttpContext";
import {
  HttpServerContext,
  HttpServerContextDirectiveSpec,
} from "../contexts/HttpServerContext";
import {
  LocationContext,
  LocationContextConfig,
  LocationContextDirectiveSpec,
} from "../contexts/LocationContext";
import { include } from "../util/require";
import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#default_type
   */
  default_type?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#sendfile
   */
  sendfile?: boolean;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#tcp_nopush
   */
  tcp_nopush?: boolean;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#server_names_hash_bucket_size
   */
  server_names_hash_bucket_size?: boolean;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#server_name
   */
  server_name?: string | string[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#listen
   */
  listen?: string | string[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#resolver
   */
  resolver?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size
   */
  client_max_body_size?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files
   */
  try_files?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#etag
   */
  etag?: boolean;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#http
   */
  http?: (HttpContext | HttpContextDirectiveSpec)[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#server
   */
  server?: (HttpServerContext | HttpServerContextDirectiveSpec)[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#location
   */
  location?: (
    | LocationContext
    | {
        config: LocationContextConfig;
        spec: LocationContextDirectiveSpec;
      }
  )[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout
   */
  keepalive_timeout?: string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#root
   */
  root?: string;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#directives
 */
export class HttpDirective extends AbstractDirective<HttpDirectiveSpec> {
  static type = "http" as const;
  static config: Config<HttpDirectiveSpec> = {
    client_max_body_size: null,
    default_type: null,
    etag: null,
    http: (items) => {
      const ns = include<{
        HttpContext: typeof HttpContext;
      }>("./../contexts/HttpContext");
      return items.map((v) =>
        v instanceof ns.HttpContext ? v : new ns.HttpContext(v)
      );
    },
    listen: null,
    location: (items) => {
      const ns = include<{
        LocationContext: typeof LocationContext;
      }>("./../contexts/LocationContext");
      return items.map((v) =>
        v instanceof ns.LocationContext
          ? v
          : new ns.LocationContext(v.config, v.spec)
      );
    },
    resolver: null,
    sendfile: null,
    server: (items) => {
      const ns = include<{
        HttpServerContext: typeof HttpServerContext;
      }>("./../contexts/HttpServerContext");
      return items.map((v) =>
        v instanceof ns.HttpServerContext ? v : new ns.HttpServerContext(v)
      );
    },
    server_name: (v) => (typeof v === "string" ? v : v.join(" ")),
    server_names_hash_bucket_size: null,
    tcp_nopush: null,
    try_files: null,
    keepalive_timeout: null,
    root: null,
  };
}
