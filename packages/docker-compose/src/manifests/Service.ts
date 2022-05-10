import type { Network } from "./Network";
import type { ServicePort } from "./ServicePort";
import type { ServiceVolume } from "./ServiceVolume";

/**
 * @link https://linux.die.net/man/7/capabilities
 */
type Cap =
  | "AUDIT_CONTROL"
  | "AUDIT_WRITE"
  | "BLOCK_SUSPEND"
  | "CHOWN"
  | "DAC_OVERRIDE"
  | "DAC_READ_SEARCH"
  | "FOWNER"
  | "DAC_OVERRIDE"
  | "DAC_READ_SEARCH"
  | "FSETID"
  | "IPC_LOCK"
  | "IPC_OWNER"
  | "KILL"
  | "LEASE"
  | "LINUX_IMMUTABLE"
  | "MAC_ADMIN"
  | "MAC_OVERRIDE"
  | "MKNOD"
  | "NET_ADMIN"
  | "NET_BIND_SERVICE"
  | "NET_BROADCAST"
  | "NET_RAW"
  | "SETGID"
  | "SETFCAP"
  | "SETPCAP"
  | "SETPCAP"
  | "SETPCAP"
  | "SETUID"
  | "SYS_ADMIN"
  | "SYSLOG"
  | "SYS_BOOT"
  | "SYS_CHROOT"
  | "SYS_MODULE"
  | "SYS_NICE"
  | "SYS_PACCT"
  | "SYS_PTRACE"
  | "SYS_RAWIO"
  | "SYS_RESOURCE"
  | "SYS_RESOURCE"
  | "SYS_TIME"
  | "SYS_TTY_CONFIG"
  | "SYSLOG"
  | "WAKE_ALARM";

export type ServiceSpec = {
  build?: {
    context?: string;
    dockerfile?: string;
    args?: Record<string, string>;
  };
  command?: string | string[];
  entrypoint?: string | string[];
  image?: string;
  labels?: string[];
  container_name?: string;
  logging?: {
    driver: "json-file";
    options: {
      "max-size": string;
      "max-file": string | number;
    };
  };
  env_file?: string[];
  environment?: Record<string, string>;
  depends_on?: (string | Service)[];
  cap_add?: (Cap | "all")[];
  cap_drop?: Cap[];
  working_dir?: string;
  restart?: "no" | "on-failure" | "always" | "unless-stopped";
  extra_hosts?: (string | [string, string])[];
  networks?: (string | Network)[];
  network_mode?:
    | "bridge"
    | "host"
    | "none"
    | { service: string | Service }
    | { container: string };
  privileged?: boolean;
  ports?: (string | ServicePort)[];
  volumes?: (string | ServiceVolume)[];
  volumes_from?: (string | Service)[];
};

export class Service {
  readonly name: string;
  readonly type: "service";
  readonly spec: ServiceSpec;
  constructor(
    readonly data: {
      name: string;
      spec: ServiceSpec;
    }
  ) {
    this.name = data.name;
    this.type = "service";
    this.spec = data.spec;
  }
  toJSON() {
    const resolveName = (v: string | Service | Network) =>
      typeof v === "string" ? v : v.name;

    return {
      ...this.spec,
      ...(this.spec.extra_hosts && {
        extra_hosts: this.spec.extra_hosts.map((v) =>
          typeof v === "string" ? v : v.join(":")
        ),
      }),
      ...(this.spec.volumes && {
        volumes: this.spec.volumes.filter(
          (v) => typeof v === "string" || v.source !== false
        ),
      }),
      ...(this.spec.volumes_from && {
        volumes_from: this.spec.volumes_from.map(resolveName),
      }),
      ...(this.spec.network_mode && {
        network_mode:
          typeof this.spec.network_mode === "string"
            ? this.spec.network_mode
            : "service" in this.spec.network_mode
            ? `service:${resolveName(this.spec.network_mode.service)}`
            : "container" in this.spec.network_mode
            ? `container:${this.spec.network_mode.container}`
            : undefined,
      }),
    } as any;
  }
}
