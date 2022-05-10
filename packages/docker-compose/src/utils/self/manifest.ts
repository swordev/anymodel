import { Config, Manifest } from "../../manifests/Config";
import { Network } from "../../manifests/Network";
import { Service } from "../../manifests/Service";
import { Version } from "../../manifests/Version";
import { Volume } from "../../manifests/Volume";

export function isManifest(manifest: unknown): manifest is Manifest {
  return (
    manifest instanceof Version ||
    manifest instanceof Network ||
    manifest instanceof Volume ||
    manifest instanceof Service
  );
}

export function validate(manifests: Manifest[]) {
  const manifestKeys: string[] = [];
  let versionSpec: string | undefined;
  for (const manifest of manifests) {
    if (!isManifest(manifest)) throw new Error("Invalid manifest");
    if (manifest instanceof Version) {
      if (!versionSpec) {
        versionSpec = manifest.spec;
      } else if (versionSpec !== manifest.spec) {
        throw new Error(
          `Found differents versions: ${versionSpec} != ${manifest.spec}`
        );
      }
    } else {
      const key = `${manifest.type}-${manifest.name}`;
      if (manifestKeys.includes(key))
        throw new Error(`Duplicated manifest: ${key}`);
      manifestKeys.push(key);
    }
  }
}

export function makeConfigEnv(name: string) {
  return `\${${name}}`;
}

export function makeRequiredConfigEnv(name: string, ifEmpty?: boolean) {
  if (ifEmpty) {
    return `\${${name}:?err}`;
  } else {
    return `\${${name}?err}`;
  }
}

export function makDefaultsConfigEnv(
  name: string,
  value: string,
  ifEmpty?: boolean
) {
  if (ifEmpty) {
    return `\${${name}:-${value}}`;
  } else {
    return `\${${name}-${value}}`;
  }
}

export function makeConfig(data: {
  manifests: Manifest[] | Record<string, Manifest>;
}) {
  const manifests = Array.isArray(data.manifests)
    ? data.manifests
    : Object.entries(data.manifests).map(([, v]) => v);

  validate(manifests);

  return new Config({
    version: manifests.find((v) => v instanceof Version) as Version,
    networks: manifests.filter((v) => v instanceof Network) as Network[],
    volumes: manifests.filter((v) => v instanceof Volume) as Volume[],
    services: manifests.filter((v) => v instanceof Service) as Service[],
  });
}
