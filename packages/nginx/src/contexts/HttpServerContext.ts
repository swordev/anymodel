import { makeContextDirectiveConfig, PickAllDirectiveKeys } from "../Directive";
import { AbstractContext } from "./AbstractContext";

const directiveConfig = makeContextDirectiveConfig({
  core: ["include", "error_log", "server_tokens"],
  http: [
    "default_type",
    "sendfile",
    "tcp_nopush",
    "server_name",
    "listen",
    "resolver",
    "client_max_body_size",
    "try_files",
    "location",
    "keepalive_timeout",
    "root",
  ],
  httpAccess: ["allow", "deny"],
  httpFastcgi: ["fastcgi_index", "fastcgi_param", "fastcgi_read_timeout"],
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
  httpHeaders: ["add_header", "add_trailer", "expires"],
  httpIndex: ["index"],
  httpProxy: [
    "proxy_set_header",
    "proxy_buffers",
    "proxy_buffer_size",
    "proxy_read_timeout",
  ],
  httpLog: ["access_log"],
  httpRewrite: [
    "break",
    "if",
    "return",
    "rewrite",
    "rewrite_log",
    "set",
    "uninitialized_variable_warn",
  ],
  httpSsl: [
    "ssl_certificate",
    "ssl_certificate_key",
    "ssl_session_cache",
    "ssl_session_tickets",
    "ssl_session_timeout",
  ],
});

export type HttpServerContextDirectiveSpec = PickAllDirectiveKeys<
  typeof directiveConfig
>;

export class HttpServerContext extends AbstractContext<HttpServerContextDirectiveSpec> {
  static directiveConfig = directiveConfig;
  type = "httpServer" as const;
  protected onName() {
    return "server";
  }
}
