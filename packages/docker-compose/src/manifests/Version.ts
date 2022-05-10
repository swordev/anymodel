export type VersionSpec = string;

export class Version {
  readonly name: string;
  readonly type: "version";
  readonly spec: VersionSpec;
  constructor(data: { spec: VersionSpec }) {
    this.name = "";
    this.type = "version";
    this.spec = data.spec;
  }
  toJSON() {
    return this.spec;
  }
}
