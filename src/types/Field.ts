export type FieldType = "text" | "textarea" | "date" | "select" | "checkbox";

/**
 * BaseField: 모든 필드가 공통으로 갖는 속성
 */
export class BaseField {
  public key: string;
  public type: FieldType;
  public label: string;
  public required: boolean;

  constructor(key: string, type: FieldType, label: string, required: boolean) {
    this.key = key;
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

  constructor(
    key: string,
    label: string,
    options: string[],
    required: boolean
  ) {
    super(key, "select", label, required);
    this.options = options;
  }
}

export type Field = BaseField | SelectField;
