export type VolumeSpec = {
  name?: string;
  external?: boolean;
  labels?: Record<string, string> | string[];
  driver?: string;
  driver_opts?: {
    type?: string;
    o?: string;
    device?: string;
  };
};

export class Volume {
  readonly name: string;
  readonly type: "volume";
  readonly spec: VolumeSpec;
  constructor(data: { name: string; spec?: VolumeSpec }) {
    this.name = data.name;
    this.type = "volume";
    this.spec = data.spec ?? {};
  }
  toJSON() {
    return this.spec;
  }
}
