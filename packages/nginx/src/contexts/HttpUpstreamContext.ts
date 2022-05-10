import { makeContextDirectiveConfig, PickAllDirectiveKeys } from "../Directive";
import { AbstractContext } from "./AbstractContext";

export type HttpUpstreamContextConfig = {
  name: string;
};

const directiveConfig = makeContextDirectiveConfig({
  core: ["include"],
  httpUpstream: ["server"],
});

export type HttpUpstreamContextDirectiveSpec = PickAllDirectiveKeys<
  typeof directiveConfig
>;

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
