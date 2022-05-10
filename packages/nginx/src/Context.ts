import { EventsContext } from "./contexts/EventsContext";
import { HttpContext } from "./contexts/HttpContext";
import { HttpServerContext } from "./contexts/HttpServerContext";
import { HttpUpstreamContext } from "./contexts/HttpUpstreamContext";
import { LocationContext } from "./contexts/LocationContext";
import { MainContext } from "./contexts/MainContext";

export type AnyContext =
  | EventsContext
  | HttpContext
  | HttpServerContext
  | HttpUpstreamContext
  | HttpUpstreamContext
  | LocationContext
  | MainContext;

export type Context = AnyContext["type"];
