import { makeContextDirectiveConfig, PickAllDirectiveKeys } from "../Directive";
import { AbstractContext } from "./AbstractContext";

const directiveConfig = makeContextDirectiveConfig({
  core: [
    "include",
    "pid",
    "user",
    "worker_processes",
    "worker_rlimit_nofile",
    "events",
    "error_log",
  ],
  http: ["http"],
});

export type MainContextSpec = PickAllDirectiveKeys<typeof directiveConfig>;

export class MainContext extends AbstractContext<MainContextSpec> {
  static directiveConfig = directiveConfig;
  type = "main" as const;
  protected onName() {
    return null;
  }
}
