import {
  makeContextDirectiveConfig,
  PickAllDirectiveKeys,
} from "../Directive.js";
import { CustomDirectiveSpec } from "../directives/CustomDirective.js";
import { AbstractContext } from "./AbstractContext.js";

export type HttpUpstreamContextConfig = {
  name: string;
};

const directiveConfig = makeContextDirectiveConfig({
  core: ["include"],
  httpUpstream: ["server"],
});

export type HttpUpstreamContextDirectiveSpec = CustomDirectiveSpec &
  PickAllDirectiveKeys<typeof directiveConfig>;

export class HttpUpstreamContext extends AbstractContext<
  HttpUpstreamContextDirectiveSpec,
  HttpUpstreamContextConfig
> {
  static directiveConfig = directiveConfig;
  type = "httpUpstream" as const;
  onRenderConfig() {
    return this.config.name;
  }
}
