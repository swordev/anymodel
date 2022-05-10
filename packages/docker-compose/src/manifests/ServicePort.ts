export type Port = number | [number, number];
export type ServicePortSource = [string, Port] | Port;

export class ServicePort {
  readonly source?: ServicePortSource;
  readonly target: Port;
  constructor(target: Port);
  constructor(sourceOrTarget: ServicePortSource | Port, target?: Port);
  constructor(sourceOrTarget: ServicePortSource | Port, target?: Port) {
    if (sourceOrTarget && target) {
      this.source = sourceOrTarget;
      this.target = target;
    } else {
      this.target = sourceOrTarget as any;
    }
  }
  private renderPort(port: Port) {
    if (Array.isArray(port)) {
      return port.join("-");
    } else {
      return port.toString();
    }
  }
  private renderSource(source: ServicePortSource) {
    if (Array.isArray(source)) {
      const [address, port] = source;
      return `${address}:${this.renderPort(port)}`;
    } else {
      return source.toString();
    }
  }
  toJSON() {
    if (this.source && this.target) {
      return `${this.renderSource(this.source)}:${this.renderPort(
        this.target
      )}`;
    } else {
      return `${this.renderPort(this.target)}`;
    }
  }
}
