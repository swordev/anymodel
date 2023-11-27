import { AbstractDirective, Config } from "./AbstractDirective";

export type HttpMapDirectiveSpec = {
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_map_module.html#map
   */
  map?: {
    source: string;
    variable: string;
    values: Record<string, number | string | undefined>;
  }[];
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_map_module.html#map_hash_bucket_size
   */
  map_hash_bucket_size?: number;
  /**
   * @link https://nginx.org/en/docs/http/ngx_http_map_module.html#map_hash_max_size
   */
  map_hash_max_size?: number;
};

/**
 * @link https://nginx.org/en/docs/http/ngx_http_access_module.html#directives
 */
export class HttpMapDirective extends AbstractDirective<HttpMapDirectiveSpec> {
  static type = "httpMap" as const;
  static config: Config<HttpMapDirectiveSpec> = {
    map: (dir, level, settings) =>
      dir.map((item) => {
        const pad = " ".repeat(level + 1);
        const values = Object.entries(item.values)
          .reduce((result, [key, value]) => {
            result.push(`${pad} ${key} ${value};`);
            return result;
          }, [] as string[])
          .join("\n");
        settings.semicolon = false;
        return `${item.source} ${item.variable} {\n${values}\n${pad}}`;
      }),
    map_hash_bucket_size: null,
    map_hash_max_size: null,
  };
}
