import { HttpUpstreamContext } from "../contexts/HttpUpstreamContext.js";
import { AbstractDirective, Config } from "./AbstractDirective.js";
import { CustomDirectiveSpec } from "./CustomDirective.js";

export type HttpUpstreamDirectiveSpec = CustomDirectiveSpec & {
  /**
   * @link http://nginx.org/en/docs/http/ngx_http_upstream_module.html#server
   */
  server?: string[];
  /**
   * @link http://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream
   */
  upstream?: HttpUpstreamContext[];
};

/**
 * @link http://nginx.org/en/docs/http/ngx_http_upstream_module.html#directives
 */
export class HttpUpstreamDirective extends AbstractDirective<HttpUpstreamDirectiveSpec> {
  static type = "httpUpstream" as const;
  static config: Config<HttpUpstreamDirectiveSpec> = {
    server: null,
    upstream: null,
  };
}
