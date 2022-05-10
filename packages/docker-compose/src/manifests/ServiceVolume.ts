import { Volume } from "./Volume";
import { posix } from "path";

function resolveSource(v: string | Volume | false) {
  if (v instanceof Volume) {
    return v.name;
  } else {
    return v;
  }
}

function isVolume(v: string | Volume | false) {
  if (v instanceof Volume) {
    return true;
  } else if (typeof v === "string") {
    return /[\\\/]/.test(v) ? false : true;
  }
}

export class ServiceVolume {
  constructor(
    readonly source: string | Volume | false,
    readonly target: string,
    readonly readOnly?: boolean
  ) {}
  path(...paths: string[]) {
    const target = this.target;
    const strPaths: string[] = paths.map((v) => v.toString());
    if (isVolume(this.source)) {
      return posix.join(target, ...strPaths);
    } else {
      const source = resolveSource(this.source);
      const isRelativePath = /^\.[\\\/]/.test(paths?.[0]?.toString());
      if (source !== false && isRelativePath) {
        return posix.join(
          target,
          posix.relative(source, posix.join(...strPaths))
        );
      } else {
        return posix.join(target, ...strPaths);
      }
    }
  }
  toJSON() {
    const source = resolveSource(this.source)
    return `${source}:${this.target}${this.readOnly ? `:ro` : ""}`;
  }
}
