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
import { UniqueRecord } from "../../types/Record";
import { initialMembers, memberFields } from "../../constants/member";
import { Field } from "../../types/Field";
import { TableBody } from "../../components/Table/TableBody";

export const MemberList: React.FC = () => {
  const [records, setRecords] = useState<UniqueRecord[]>(initialMembers);
  const { current: fields } = useRef<Field[]>(memberFields);

  const columns: TableColumn<UniqueRecord>[] = fields.map((field) => ({
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

      <Table<UniqueRecord> data={records} columns={columns}>
        <TableHeader
          render={({ column, setFilter }) => (
            <input
              type="text"
              placeholder={`Filter ${column.label}`}
              onChange={(e) => {
                setFilter(column.accessor, e.target.value);
              }}
            />
          )}
        />
        <TableBody<UniqueRecord>
          render={({ row }) => <TableRow key={row.id} row={row} />}
        />
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
