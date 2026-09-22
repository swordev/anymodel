import {
  EventsContext,
  EventsContextDirectiveSpec,
} from "../contexts/EventsContext.js";
import { AbstractDirective, Config } from "./AbstractDirective.js";
import { CustomDirectiveSpec } from "./CustomDirective.js";

export type CoreDirectiveSpec = CustomDirectiveSpec & {
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#user
   */
  user?: [string, string] | string;
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#include
   */
  include?: string | string[];
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#worker_processes
   */
  worker_processes?: number;
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#pid
   */
  pid?: string;
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#worker_rlimit_nofile
   */
  worker_rlimit_nofile?: number;
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#worker_connections
   */
  worker_connections?: number;
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#events
   */
  events?: (EventsContext | EventsContextDirectiveSpec)[];
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#error_log
   */
  error_log?: string;
  /**
   * @link https://nginx.org/en/docs/ngx_core_module.html#server_tokens
   */
  server_tokens?: boolean | "build" | string;
};

/**
 * @link https://nginx.org/en/docs/ngx_core_module.html#directives
 */
export class CoreDirective extends AbstractDirective<CoreDirectiveSpec> {
  static type = "core" as const;
  static config: Config<CoreDirectiveSpec> = {
    include: null,
    pid: null,
    user: (v) => (typeof v === "string" ? v : v.join(" ")),
    worker_connections: null,
    worker_processes: null,
    worker_rlimit_nofile: null,
    events: (items) => {
      return items.map((v) =>
        v instanceof EventsContext ? v : new EventsContext(v),
      );
    },
    error_log: null,
    server_tokens: null,
  };
}
