import React, { createContext, useContext } from "react";
import { useTable, UseTableProps } from "./hooks/useTable";

export interface TableContextType<T> {
  columns: UseTableProps<T>["columns"];
  data: T[];
  filters: Partial<Record<keyof T, string>>;
  setFilter: (column: keyof T, value: string) => void;
}

const TableContext = createContext<TableContextType<any> | null>(null);

export const useTableContext = <T,>(): TableContextType<T> => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table compound components must be used within a Table.");
  }
  return context;
};

interface TableProps<T> extends UseTableProps<T> {
  children: React.ReactNode;
}

export const Table = <T,>({ data, columns, children }: TableProps<T>) => {
  const table = useTable({ data, columns });

  return (
    <TableContext.Provider value={table as TableContextType<T>}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {children}
      </table>
    </TableContext.Provider>
  );
};
