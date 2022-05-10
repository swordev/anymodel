import { makeContextDirectiveConfig, PickAllDirectiveKeys } from "../Directive";
import { AbstractContext } from "./AbstractContext";

const directiveConfig = makeContextDirectiveConfig({
  core: ["include", "worker_connections"],
});

export type EventsContextDirectiveSpec = PickAllDirectiveKeys<
  typeof directiveConfig
>;

export class EventsContext extends AbstractContext<EventsContextDirectiveSpec> {
  static directiveConfig = directiveConfig;
  type = "events" as const;
}
