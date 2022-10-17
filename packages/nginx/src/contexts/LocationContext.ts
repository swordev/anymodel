import { makeContextDirectiveConfig, PickAllDirectiveKeys } from "../Directive";
import { AbstractContext } from "./AbstractContext";

type Comparator = "=" | "~" | "~*" | "^~";

export type LocationContextConfig =
  | {
      uri: string;
      comparator?: Comparator;
    }
  | string
  | [Comparator, string];

const directiveConfig = makeContextDirectiveConfig({
  core: ["include", "error_log", "server_tokens"],
  http: [
    "default_type",
    "sendfile",
    "tcp_nopush",
    "resolver",
    "client_max_body_size",
    "try_files",
    "keepalive_timeout",
    "root",
  ],
  httpAccess: ["allow", "deny"],
  httpFastcgi: [
    "fastcgi_pass",
    "fastcgi_index",
    "fastcgi_param",
    "fastcgi_read_timeout",
  ],
  httpHeaders: ["add_header", "add_trailer", "expires"],
  httpGzip: [
    "gzip",
    "gzip_buffers",
    "gzip_comp_level",
    "gzip_disable",
    "gzip_http_version",
    "gzip_min_length",
    "gzip_proxied",
    "gzip_types",
    "gzip_vary",
  ],
  httpIndex: ["index"],
  httpProxy: [
    "proxy_set_header",
    "proxy_pass",
    "proxy_buffers",
    "proxy_buffer_size",
    "proxy_read_timeout",
  ],
  httpRewrite: [
    "break",
    "if",
    "return",
    "rewrite",
    "rewrite_log",
    "set",
    "uninitialized_variable_warn",
  ],
  httpLog: ["access_log"],
});

export type LocationContextDirectiveSpec = PickAllDirectiveKeys<
  typeof directiveConfig
>;

/**
 * @link https://nginx.org/en/docs/http/ngx_http_core_module.html#location
 */
export class LocationContext extends AbstractContext<
  LocationContextDirectiveSpec,
  LocationContextConfig
> {
  static directiveConfig = directiveConfig;
  type = "location" as const;
  protected onRenderConfig() {
    const config = this.config;
    if (Array.isArray(config)) {
      const [comparator, uri] = config;
      return `${comparator} ${uri}`;
    } else if (typeof config === "string") {
      return config;
    } else {
      const comparator = config.comparator ? ` ${config.comparator} ` : "";
      return `${comparator}${config.uri}`;
    }
  }
}
