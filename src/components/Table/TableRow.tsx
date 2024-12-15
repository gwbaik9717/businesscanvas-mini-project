import { UniqueRecord } from "../../types/Record";
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
          key={column.accessor as string}
          style={{ padding: "8px", borderBottom: "1px solid #eee" }}
        >
          {column.accessor && row[column.accessor] !== undefined
            ? String(row[column.accessor])
            : null}
        </td>
      ))}
    </tr>
  );
};
