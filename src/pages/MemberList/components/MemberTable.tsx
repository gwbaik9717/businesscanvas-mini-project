import { useState } from "react";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Filter } from "../../../components/Filter/Filter";
import { TableColumn } from "../../../components/Table/hooks/useTable";
import { Table } from "../../../components/Table/Table";
import { TableBody } from "../../../components/Table/TableBody";
import { TableHeader } from "../../../components/Table/TableHeader";
import { TableRow } from "../../../components/Table/TableRow";
import { Text } from "../../../components/Typography/Text";
import { Field } from "../../../types/Field";
import { UniqueRecord } from "../../../types/Record";
import { RecordEdit } from "../../../components/RecordEdit/RecordEdit";
import { color } from "../../../styles/theme/theme";
import { useFilter } from "../hooks/useFilter";

interface MemberTableProps {
  records: UniqueRecord[];
  fields: Field[];
  onRecordDelete: (id: string) => void;
  onRecordEdit: (record: UniqueRecord) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  records,
  fields,
  onRecordDelete,
  onRecordEdit,
}) => {
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const { getFilterOptions } = useFilter(records);

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
        <RecordEdit
          options={[
            { label: "수정", value: "수정" },
            {
              label: (
                <Text
                  fontSize="fontSizeLg"
                  style={{
                    color: color.error,
                  }}
                >
                  삭제
                </Text>
              ),
              value: "삭제",
            },
          ]}
          onSelectionChange={(selectedValue) => {
            if (selectedValue === "수정") {
              onRecordEdit(row);
            }

            if (selectedValue === "삭제") {
              onRecordDelete(row.id);
            }
          }}
        />
      ),
    },
  ];

  return (
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
              <Text fontSize="fontSizeLg" fontWeight="fontWeightBold">
                {column.label}
              </Text>
              <Filter
                options={getFilterOptions(column.accessor)}
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
  );
};
