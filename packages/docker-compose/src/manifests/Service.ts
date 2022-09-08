import type { Network } from "./Network";
import type { ServicePort } from "./ServicePort";
import type { ServiceVolume } from "./ServiceVolume";

export type ServiceLoggingMap = {
  none: any;
  local: any;
  "json-file": {
    "max-size"?: string;
    "max-file"?: string | number;
  };
  syslog: {
    "syslog-address"?: string;
  };
  journald: any;
  gelf: any;
  fluentd: any;
  awslogs: any;
  splunk: any;
  etwlogs: any;
  gcplogs: any;
  logentries: any;
};

export type ServiceLogging = {
  [K in keyof ServiceLoggingMap]: {
    driver: K;
    options?: ServiceLoggingMap[K];
  };
}[keyof ServiceLoggingMap];

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
    args?: Record<string, string> | string[];
    cache_from?: string[];
    context?: string;
    dockerfile?: string;
    labels?: string[];
    network?: string;
    shm_size?: string | number;
    target?: string;
  };
  cap_add?: (Cap | "all")[];
  cap_drop?: Cap[];
  cgroup_parent?: string;
  command?: string | string[];
  container_name?: string;
  credential_spec?: {
    config?: string;
    file?: string;
    registry?: string;
  };
  depends_on?: (string | Service)[];
  devices?: string | string[];
  dns_search?: string | string[];
  dns?: string | string[];
  entrypoint?: string | string[];
  env_file?: string | string[];
  environment?: Record<string, string> | string[];
  expose?: string[];
  external_links?: string[];
  extra_hosts?: (string | [string, string])[];
  healthcheck?: {
    disable?: boolean;
    interval?: string;
    retries?: number;
    start_period?: string;
    test?: string | string[];
    timeout?: string;
  };
  image?: string;
  init?: boolean;
  labels?: string[];
  logging?: ServiceLogging;
  network_mode?:
    | "bridge"
    | "host"
    | "none"
    | { service: string | Service }
    | { container: string };
  networks?: (string | Network)[];
  pid?: string;
  ports?: (string | ServicePort)[];
  privileged?: boolean;
  profiles?: string[];
  restart?: "no" | "on-failure" | "always" | "unless-stopped";
  security_opt?: string[];
  stop_grace_period?: string;
  stop_signal?: string;
  sysctls?: Record<string, string | number> | string[];
  tmpfs?: string | string[];
  ulimits?: {
    nproc?: number;
    nofile?: {
      hard?: number;
      soft?: number;
    };
  };
  userns_mode?: string;
  volumes_from?: (string | Service)[];
  volumes?: (string | ServiceVolume)[];
  working_dir?: string;
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
