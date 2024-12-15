export type FieldType = "text" | "textarea" | "date" | "select" | "checkbox";

/**
 * BaseField: 모든 필드가 공통으로 갖는 속성
 */
export class BaseField {
  public id: string;
  public type: FieldType;
  public label: string;
  public required: boolean;

  constructor(id: string, type: FieldType, label: string, required: boolean) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.required = required;
  }
}

/**
 * SelectField: Select 필드가 공통으로 갖는 속성
 *   - options: select에서 선택 가능한 옵션 배열
 */
export class SelectField extends BaseField {
  public options: string[];

  constructor(id: string, label: string, options: string[], required: boolean) {
    super(id, "select", label, required);
    this.options = options;
  }
}

export type Field = BaseField | SelectField;
