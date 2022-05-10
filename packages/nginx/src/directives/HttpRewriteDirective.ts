import {
  IfContext,
  IfContextConfig,
  IfContextDirectiveSpec,
} from "../contexts/IfContext";
import { include } from "../util/require";
import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpRewriteDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break
   */
  break?: null;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if
   */
  if?: (
    | IfContext
    | { config: IfContextConfig; spec: IfContextDirectiveSpec }
  )[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return
   */
  return?: number | [number, string] | string;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite
   */
  rewrite?: {
    regex: string;
    replacement: string;
    flag?: "last" | "break" | "redirect" | "permanent";
  };
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite_log
   */
  rewrite_log?: boolean;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#set
   */
  set?: Record<string, string>;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#uninitialized_variable_warn
   */
  uninitialized_variable_warn?: boolean;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#directives
 */
export class HttpRewriteDirective extends AbstractDirective<HttpRewriteDirectiveSpec> {
  static type = "httpRewrite" as const;
  static config: Config<HttpRewriteDirectiveSpec> = {
    break: (v) => "",
    if: (items) => {
      const ns = include<{
        IfContext: typeof IfContext;
      }>("./../contexts/IfContext");
      return items.map((v) =>
        v instanceof ns.IfContext ? v : new ns.IfContext(v.config, v.spec)
      );
    },
    return: (v) => (Array.isArray(v) ? v : [v]).join(" "),
    rewrite: null,
    rewrite_log: null,
    set: null,
    uninitialized_variable_warn: null,
  };
}
