import { Table } from "../Table";
import { Record } from "../Record";
import { BaseField, SelectField } from "../Field";

const InitialMembers: Record[] = [
  {
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    joinedDate: "2024-10-02",
    job: "개발자",
    emailAgree: true,
  },
  {
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    joinedDate: "2024-10-01",
    job: "PO",
    emailAgree: false,
  },
];

const MemberFields = [
  new BaseField("name", "text", "이름", true),
  new BaseField("address", "text", "주소", false),
  new BaseField("memo", "textarea", "메모", false),
  new BaseField("joinedDate", "date", "가입일", true),
  new SelectField("job", "직업", ["개발자", "PO", "디자이너"], false),
  new BaseField("emailAgree", "checkbox", "이메일 수신 동의", false),
];

export class MemberTable extends Table {
  constructor() {
    super(MemberFields, InitialMembers);
  }
}
