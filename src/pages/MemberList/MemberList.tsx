import React from "react";
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

interface RowData {
  id: number;
  name: string;
  age: number;
  job: string;
}

const data: RowData[] = [
  { id: 1, name: "John Doe", age: 30, job: "Developer" },
  { id: 2, name: "Jane Smith", age: 25, job: "Designer" },
  { id: 3, name: "Sam Wilson", age: 35, job: "Manager" },
];

const columns: TableColumn<RowData>[] = [
  { label: "ID", accessor: "id", filterable: false },
  { label: "Name", accessor: "name", filterable: true },
  { label: "Age", accessor: "age", filterable: true },
  { label: "Job", accessor: "job", filterable: true },
];

export const MemberList: React.FC = () => {
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
        <ButtonWithIcons startContent={<PlusIcon width={16} height={16} />}>
          <Text>추가</Text>
        </ButtonWithIcons>
      </StyledPageHeader>

      <Table<RowData> data={data} columns={columns}>
        <TableHeader<RowData> />
        <tbody>
          {data.map((row) => (
            <TableRow<RowData> key={row.id} row={row} />
          ))}
        </tbody>
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
