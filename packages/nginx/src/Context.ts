import { EventsContext } from "./contexts/EventsContext.js";
import { HttpContext } from "./contexts/HttpContext.js";
import { HttpServerContext } from "./contexts/HttpServerContext.js";
import { HttpUpstreamContext } from "./contexts/HttpUpstreamContext.js";
import { LocationContext } from "./contexts/LocationContext.js";
import { MainContext } from "./contexts/MainContext.js";

export type AnyContext =
  | EventsContext
  | HttpContext
  | HttpServerContext
  | HttpUpstreamContext
  | HttpUpstreamContext
  | LocationContext
  | MainContext;

export type Context = AnyContext["type"];
