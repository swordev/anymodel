import { validate } from "../utils/self/manifest";
import { Network } from "./Network";
import { Service } from "./Service";
import { Version } from "./Version";
import { Volume } from "./Volume";

export type Manifest = Version | Network | Volume | Service;

export type ConfigData = {
  version?: Version;
  networks?: Record<string, Network | undefined> | Network[];
  volumes?: Record<string, Volume | undefined> | Volume[];
  services?: Record<string, Service | undefined> | Service[];
  manifests?: Record<string, Manifest | undefined> | Manifest[];
  configs?: Record<string, Config | undefined> | Config[];
};

export class Config<T extends ConfigData = ConfigData> {
  constructor(readonly data: T) {}

  toManifests() {
    const result: Manifest[] = [];
    const toArray = <T>(value: Record<string, T | undefined> | T[]) =>
      (Array.isArray(value) ? value : Object.values(value)).filter(
        (v) => typeof v !== "undefined"
      ) as T[];
    if (this.data.version) {
      result.push(this.data.version);
    }
    if (this.data.networks) {
      result.push(...toArray(this.data.networks));
    }
    if (this.data.volumes) {
      result.push(...toArray(this.data.volumes));
    }
    if (this.data.services) {
      result.push(...toArray(this.data.services));
    }
    if (this.data.manifests) {
      result.push(...toArray(this.data.manifests));
    }
    if (this.data.configs) {
      result.push(
        ...toArray(this.data.configs).flatMap((c) => c.toManifests())
      );
    }
    return result;
  }

  toJSON() {
    const manifests = this.toManifests();

    validate(manifests);

    const data = {
      versions: manifests.filter((v) => v instanceof Version) as Version[],
      networks: manifests.filter((v) => v instanceof Network) as Network[],
      volumes: manifests.filter((v) => v instanceof Volume) as Volume[],
      services: manifests.filter((v) => v instanceof Service) as Service[],
    };

    return {
      ...(!!data.versions.length && {
        version: data.versions[0].toJSON(),
      }),
      ...(!!data.networks.length && {
        networks: data.networks.reduce((networks, network) => {
          networks[network.name] = network.toJSON();
          return networks;
        }, {} as Record<string, Network["spec"]>),
      }),
      ...(!!data.volumes.length && {
        volumes: data.volumes?.reduce((volumes, volume) => {
          volumes[volume.name] = volume.toJSON();
          return volumes;
        }, {} as Record<string, Volume["spec"]>),
      }),
      ...(!!data.services.length && {
        services: data.services?.reduce((services, service) => {
          services[service.name] = service.toJSON();
          return services;
        }, {} as Record<string, Service["spec"]>),
      }),
    };
  }
}
