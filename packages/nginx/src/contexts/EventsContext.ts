import {
  makeContextDirectiveConfig,
  PickAllDirectiveKeys,
} from "../Directive.js";
import { CustomDirectiveSpec } from "../directives/CustomDirective.js";
import { AbstractContext } from "./AbstractContext.js";

const directiveConfig = makeContextDirectiveConfig({
  core: ["include", "worker_connections"],
});

export type EventsContextDirectiveSpec = CustomDirectiveSpec &
  PickAllDirectiveKeys<typeof directiveConfig>;

export class EventsContext extends AbstractContext<EventsContextDirectiveSpec> {
  static directiveConfig = directiveConfig;
  type = "events" as const;
}
