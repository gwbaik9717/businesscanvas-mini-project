import React, { useRef, useState } from "react";
import { Table } from "../../components/Table/Table";
import { TableHeader } from "../../components/Table/TableHeader";
import { TableRow } from "../../components/Table/TableRow";
import { TableColumn } from "../../components/Table/hooks/useTable";
import { ButtonWithIcons } from "../../components/Button/ButtonWithIcons";
import { PlusIcon } from "../../components/Icons/PlusIcon";
import styled from "styled-components";
import { PageLayout } from "../../layouts/PageLayout";
import { Heading } from "../../components/Typography/Heading";
import { Text } from "../../components/Typography/Text";
import { color } from "../../styles/theme/theme";
import { MemberRecord } from "../../types/MemberRecord";
import { initialMembers, memberFields } from "../../constants/member";
import { Field } from "../../types/Field";
import { TableBody } from "../../components/Table/TableBody";

// interface RowData {
//   id: number;
//   name: string;
//   age: number;
//   job: string;
// }

// const data: RowData[] = [
//   { id: 1, name: "John Doe", age: 30, job: "Developer" },
//   { id: 2, name: "Jane Smith", age: 25, job: "Designer" },
//   { id: 3, name: "Sam Wilson", age: 35, job: "Manager" },
// ];

// const columns: TableColumn<RowData>[] = [
//   { label: "ID", accessor: "id", filterable: false },
//   { label: "Name", accessor: "name", filterable: true },
//   { label: "Age", accessor: "age", filterable: true },
//   { label: "Job", accessor: "job", filterable: true },
// ];

export const MemberList: React.FC = () => {
  const [records, setRecords] = useState<MemberRecord[]>(initialMembers);
  const { current: fields } = useRef<Field[]>(memberFields);

  const columns: TableColumn<MemberRecord>[] = fields.map((field) => ({
    label: field.label,
    accessor: field.key,
    filterable: true,
  }));

  return (
    <PageLayout>
      <StyledPageHeader>
        <Heading
          as="h1"
          lineHeight="lineHeightRelaxed"
          fontWeight="fontWeightBold"
        >
          멤버 목록
        </Heading>
        <ButtonWithIcons
          startContent={
            <PlusIcon width={10} height={10} color={color.bgContainer} />
          }
        >
          <Text fontSize="fontSizeLg">추가</Text>
        </ButtonWithIcons>
      </StyledPageHeader>

      <Table<MemberRecord> data={records} columns={columns}>
        <TableHeader />
        <TableBody>
          {records.map((record) => (
            <TableRow<MemberRecord> key={record.id} row={record} />
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
};

const StyledPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
