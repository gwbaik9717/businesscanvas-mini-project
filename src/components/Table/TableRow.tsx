import { useTableContext } from "./Table";

interface TableRowProps<T> {
  row: T;
}

export const TableRow = <T,>({ row }: TableRowProps<T>) => {
  const { columns } = useTableContext<T>();

  return (
    <tr>
      {columns.map((column) => (
        <td
          key={column.accessor as string}
          style={{ padding: "8px", borderBottom: "1px solid #eee" }}
        >
          {column.accessor && row[column.accessor] !== undefined
            ? String(row[column.accessor]) // Ensure the value is rendered as a string
            : null}
        </td>
      ))}
    </tr>
  );
};
