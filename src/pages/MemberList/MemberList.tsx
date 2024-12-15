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
import { RegisterOptionType, Select } from "../../components/Select/Select";
import { SelectMenu } from "../../components/Select/SelectMenu";
import { SelectMenuItem } from "../../components/Select/SelectMenuItem";
import { SelectTrigger } from "../../components/Select/SelectTrigger";
import { Filter } from "../../components/Filter/Filter";
import { MemberModal } from "./components/MemberModal";

export const MemberList: React.FC = () => {
  const [records, setRecords] = useState<UniqueRecord[]>(initialMembers);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [editingRecord, setEditingRecord] = useState<UniqueRecord | null>(null);

  const { current: fields } = useRef<Field[]>(memberFields);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (editingRecord) {
      setEditingRecord(null);
    }
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const saveRecord = (record: UniqueRecord) => {
    setRecords((prev) => {
      const existingIndex = prev.findIndex((r) => r.id === record.id);

      // Update existing record
      if (existingIndex > -1) {
        const updatedRecords = [...prev];
        updatedRecords[existingIndex] = record;
        return updatedRecords;
      }

      // Add new record
      return [...prev, record];
    });
  };

  const fieldColumns: TableColumn<UniqueRecord>[] = fields.map((field) => ({
    id: field.id,
    label: field.label,
    accessor: field.id,
  }));

  const columns: TableColumn<UniqueRecord>[] = [
    {
      id: "id_1",
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
      id: "id_2",
      label: null,
      accessor: "id",
      render: (_value, row) => (
        <Select
          selectionMode="single"
          onSelectionChange={(value) => {
            if (value === "1") {
              setEditingRecord(row);
              openModal();
            }

            if (value === "2") {
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

  const getOptionsByAccessor = (
    accessor: keyof UniqueRecord
  ): RegisterOptionType[] => {
    const uniqueOptions = records.reduce((acc, record) => {
      const value = record[accessor];
      if (value !== undefined && value !== null) {
        const valueString =
          typeof value === "string" ? value : value.toString();
        acc.set(valueString, value);
      }
      return acc;
    }, new Map<string, unknown>());

    return Array.from(uniqueOptions.entries()).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  };

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
          onClick={openModal}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>{column.label}</Text>
                <Filter
                  options={getOptionsByAccessor(column.accessor)}
                  onSelectionChange={(values) => {
                    setFilter(column.accessor, values);
                  }}
                />
              </div>
            );
          }}
        />
        <TableBody<UniqueRecord>
          render={({ row }) => <TableRow key={row.id} row={row} />}
        />
      </Table>
      <MemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveRecord}
        fields={fields}
        record={editingRecord}
      />
    </PageLayout>
  );
};

const StyledPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
