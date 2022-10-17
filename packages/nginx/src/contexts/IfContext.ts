import { makeContextDirectiveConfig, PickAllDirectiveKeys } from "../Directive";
import { AbstractContext } from "./AbstractContext";

export type IfContextConfig =
  | {
      condition: string;
    }
  | string;

export const directiveConfig = makeContextDirectiveConfig({
  core: ["include", "error_log"],
  http: ["sendfile", "root"],
  httpFastcgi: ["fastcgi_pass"],
  httpGzip: ["gzip"],
  httpHeaders: ["add_header", "add_trailer", "expires"],
  httpProxy: ["proxy_pass"],
  httpLog: ["access_log"],
  httpRewrite: [
    "break",
    "return",
    "rewrite",
    "rewrite_log",
    "set",
    "uninitialized_variable_warn",
  ],
});

export type IfContextDirectiveSpec = PickAllDirectiveKeys<
  typeof directiveConfig
>;
export class IfContext extends AbstractContext<
  IfContextDirectiveSpec,
  IfContextConfig
> {
  static directiveConfig = directiveConfig;
  type = "if" as const;
  protected onRenderConfig() {
    return `(${
      typeof this.config === "string" ? this.config : this.config.condition
    })`;
  }
}
