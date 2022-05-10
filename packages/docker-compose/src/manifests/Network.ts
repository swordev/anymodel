export type NetworkSpec = {
  internal?: boolean;
  ipam?: {
    config: {
      subnet: string;
    }[];
  };
};

export class Network {
  readonly name: string;
  readonly type: "network";
  readonly spec: NetworkSpec;
  constructor(
    readonly data: {
      name: string;
      spec: NetworkSpec;
    }
  ) {
    this.name = data.name;
    this.type = "network";
    this.spec = data.spec;
  }
  toJSON() {
    return this.spec;
  }
}
