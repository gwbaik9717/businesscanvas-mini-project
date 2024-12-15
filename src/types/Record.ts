import { v4 as uuidv4 } from "uuid";

export type UniqueRecord = {
  id: string;
} & Record<string, unknown>;
export class RecordEntity implements UniqueRecord {
  id: string;
  [key: string]: unknown;

  constructor(initialValues: Record<string, unknown> = {}) {
    this.id = uuidv4();
    Object.assign(this, initialValues);
  }
}
