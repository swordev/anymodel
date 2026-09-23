import { CoreDirective } from "./directives/CoreDirective.js";
import { HttpAccessDirective } from "./directives/HttpAccessDirective.js";
import { HttpDirective } from "./directives/HttpDirective.js";
import { HttpFastcgiDirective } from "./directives/HttpFastcgiDirective.js";
import { HttpGzipDirective } from "./directives/HttpGzipDirective.js";
import { HttpHeadersDirective } from "./directives/HttpHeadersDirective.js";
import { HttpIndexDirective } from "./directives/HttpIndexDirective.js";
import { HttpLogDirective } from "./directives/HttpLogDirective.js";
import { HttpMapDirective } from "./directives/HttpMapDirective.js";
import { HttpProxyDirective } from "./directives/HttpProxyDirective.js";
import { HttpRewriteDirective } from "./directives/HttpRewriteDirective.js";
import { HttpSslDirective } from "./directives/HttpSslDirective.js";
import { HttpUpstreamDirective } from "./directives/HttpUpstreamDirective.js";

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
  options: T,
): typeof options {
  return options as any;
}

export declare type ElementOf<Type extends readonly any[]> =
  Type extends readonly (infer Values)[] ? Values : never;

export type PickDirectiveKeys<
  TConfig extends ContextDirectiveConfig,
  TKey extends keyof DirectiveMap,
  TSpec extends Record<string, any> = DirectiveMap[TKey]["spec"],
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
