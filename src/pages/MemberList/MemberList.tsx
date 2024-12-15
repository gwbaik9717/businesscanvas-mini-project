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
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { ButtonIconOnly } from "../../components/Button/ButtonIconOnly";
import { KebabIcon } from "../../components/Icons/KebabIcon";
import { Select } from "../../components/Select/Select";
import { SelectMenu } from "../../components/Select/SelectMenu";
import { SelectMenuItem } from "../../components/Select/SelectMenuItem";
import { SelectTrigger } from "../../components/Select/SelectTrigger";

export const MemberList: React.FC = () => {
  const [records, setRecords] = useState<UniqueRecord[]>(initialMembers);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const { current: fields } = useRef<Field[]>(memberFields);

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const fieldColumns: TableColumn<UniqueRecord>[] = fields.map((field) => ({
    label: field.label,
    accessor: field.key,
  }));

  const columns: TableColumn<UniqueRecord>[] = [
    {
      label: null,
      accessor: "id",
      render: (_value, row) => (
        <Checkbox
          width={16}
          height={16}
          checked={checkedRows.includes(row.id)}
          onValueChange={(value) => {
            if (value) {
              setCheckedRows((prev) => [...prev, row.id]);
            } else {
              setCheckedRows((prev) => prev.filter((id) => id !== row.id));
            }
          }}
        />
      ),
    },
    ...fieldColumns,
    {
      label: null,
      accessor: "id",
      render: (_value, row) => (
        <Select
          selectionMode="single"
          onSelectionChange={(key) => {
            if (key === "1") {
              console.log("수정");
            }

            if (key === "2") {
              deleteRecord(row.id);
            }
          }}
        >
          <SelectTrigger as={ButtonIconOnly}>
            <KebabIcon width={10} height={10} color={color.text} />
          </SelectTrigger>

          <SelectMenu variant="right">
            <SelectMenuItem key="1" value="1">
              <Text fontSize="fontSizeLg">수정</Text>
            </SelectMenuItem>
            <SelectMenuItem key="2" value="2">
              <Text fontSize="fontSizeLg">삭제</Text>
            </SelectMenuItem>
          </SelectMenu>
        </Select>
      ),
    },
  ];

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
          render={({ column, setFilter }) => {
            if (column.label === null) {
              return null;
            }

            return (
              <input
                type="text"
                placeholder={`Filter ${column.label}`}
                onChange={(e) => {
                  setFilter(column.accessor, e.target.value);
                }}
              />
            );
          }}
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
