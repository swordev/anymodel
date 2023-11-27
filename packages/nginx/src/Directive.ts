import { CoreDirective } from "./directives/CoreDirective";
import { HttpAccessDirective } from "./directives/HttpAccessDirective";
import { HttpDirective } from "./directives/HttpDirective";
import { HttpFastcgiDirective } from "./directives/HttpFastcgiDirective";
import { HttpGzipDirective } from "./directives/HttpGzipDirective";
import { HttpHeadersDirective } from "./directives/HttpHeadersDirective";
import { HttpIndexDirective } from "./directives/HttpIndexDirective";
import { HttpLogDirective } from "./directives/HttpLogDirective";
import { HttpMapDirective } from "./directives/HttpMapDirective";
import { HttpProxyDirective } from "./directives/HttpProxyDirective";
import { HttpRewriteDirective } from "./directives/HttpRewriteDirective";
import { HttpSslDirective } from "./directives/HttpSslDirective";
import { HttpUpstreamDirective } from "./directives/HttpUpstreamDirective";
import { ElementOf } from "ts-essentials";

export const directiveMap = {
  [CoreDirective.type]: CoreDirective,
  [HttpDirective.type]: HttpDirective,
  [HttpAccessDirective.type]: HttpAccessDirective,
  [HttpFastcgiDirective.type]: HttpFastcgiDirective,
  [HttpGzipDirective.type]: HttpGzipDirective,
  [HttpHeadersDirective.type]: HttpHeadersDirective,
  [HttpIndexDirective.type]: HttpIndexDirective,
  [HttpLogDirective.type]: HttpLogDirective,
  [HttpProxyDirective.type]: HttpProxyDirective,
  [HttpRewriteDirective.type]: HttpRewriteDirective,
  [HttpSslDirective.type]: HttpSslDirective,
  [HttpUpstreamDirective.type]: HttpUpstreamDirective,
  [HttpMapDirective.type]: HttpMapDirective,
};

export type DirectiveMap = {
  [CoreDirective.type]: CoreDirective;
  [HttpDirective.type]: HttpDirective;
  [HttpAccessDirective.type]: HttpAccessDirective;
  [HttpFastcgiDirective.type]: HttpFastcgiDirective;
  [HttpGzipDirective.type]: HttpGzipDirective;
  [HttpHeadersDirective.type]: HttpHeadersDirective;
  [HttpIndexDirective.type]: HttpIndexDirective;
  [HttpLogDirective.type]: HttpLogDirective;
  [HttpProxyDirective.type]: HttpProxyDirective;
  [HttpRewriteDirective.type]: HttpRewriteDirective;
  [HttpSslDirective.type]: HttpSslDirective;
  [HttpUpstreamDirective.type]: HttpUpstreamDirective;
  [HttpMapDirective.type]: HttpMapDirective;
};

export type ContextDirectiveConfig = {
  [K in keyof DirectiveMap]?: readonly (keyof DirectiveMap[K]["spec"])[];
};

export function makeContextDirectiveConfig<T extends ContextDirectiveConfig>(
  options: T
): typeof options {
  return options as any;
}

export type PickDirectiveKeys<
  TConfig extends ContextDirectiveConfig,
  TKey extends keyof DirectiveMap,
  TSpec extends Record<string, any> = DirectiveMap[TKey]["spec"]
> = TConfig[TKey] extends readonly (keyof TSpec)[]
  ? Pick<TSpec, ElementOf<TConfig[TKey]>>
  : {};

export type PickAllDirectiveKeys<T extends ContextDirectiveConfig> =
  PickDirectiveKeys<T, "core"> &
    PickDirectiveKeys<T, "http"> &
    PickDirectiveKeys<T, "httpAccess"> &
    PickDirectiveKeys<T, "httpFastcgi"> &
    PickDirectiveKeys<T, "httpGzip"> &
    PickDirectiveKeys<T, "httpHeaders"> &
    PickDirectiveKeys<T, "httpIndex"> &
    PickDirectiveKeys<T, "httpLog"> &
    PickDirectiveKeys<T, "httpProxy"> &
    PickDirectiveKeys<T, "httpRewrite"> &
    PickDirectiveKeys<T, "httpSsl"> &
    PickDirectiveKeys<T, "httpUpstream"> &
    PickDirectiveKeys<T, "httpMap">;
