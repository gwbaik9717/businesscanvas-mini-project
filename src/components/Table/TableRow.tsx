import { UniqueRecord } from "../../types/Record";
import { Checkbox } from "../Checkbox/Checkbox";
import { useTableContext } from "./Table";

interface TableRowProps<T extends UniqueRecord> {
  row: T;
}

export const TableRow = <T extends UniqueRecord>({ row }: TableRowProps<T>) => {
  const { columns } = useTableContext<T>();

  return (
    <tr>
      {columns.map((column) => (
        <td
          key={column.id}
          style={{ padding: "8px", borderBottom: "1px solid #eee" }}
        >
          {column.render ? (
            column.render(row[column.accessor as keyof T], row)
          ) : row[column.accessor as keyof T] !== undefined ? (
            typeof row[column.accessor as keyof T] === "boolean" ? (
              <Checkbox
                width={16}
                height={16}
                checked={row[column.accessor as keyof T] as boolean}
              />
            ) : (
              row[column.accessor as keyof T]?.toString()
            )
          ) : null}
        </td>
      ))}
    </tr>
  );
};
