import { Field } from "./Field";
import { Record } from "./Record";

export class Table {
  private fields: Field[];
  private records: Record[];

  constructor(fields: Field[], records: Record[]) {
    this.fields = fields;
    this.records = records;
  }
}
