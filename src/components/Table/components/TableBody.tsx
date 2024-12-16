import { UniqueRecord } from "../../../types/Record";
import { useTableContext } from "./Table";
import { TableRow } from "./TableRow";

interface TableBodyProps<T extends UniqueRecord> {
  render?: (props: { row: T }) => React.ReactNode;
}

export const TableBody = <T extends UniqueRecord>({
  render,
}: TableBodyProps<T>) => {
  const { data: rows } = useTableContext<T>();

  return (
    <tbody>
      {render
        ? rows.map((row) => render({ row }))
        : rows.map((row) => <TableRow key={row.id} row={row} />)}
    </tbody>
  );
};
