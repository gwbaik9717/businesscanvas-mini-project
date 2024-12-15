import { useState, useMemo } from "react";
import { UniqueRecord } from "../../../types/Record";

export interface TableColumn<T extends UniqueRecord> {
  label: string | null;
  accessor: keyof T;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
}

export interface UseTableProps<T extends UniqueRecord> {
  data: T[];
  columns: TableColumn<T>[];
}

export function useTable<T extends UniqueRecord>({
  data,
  columns,
}: UseTableProps<T>) {
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = row[key as keyof T];

        return cellValue === value;
      })
    );
  }, [data, filters]);

  const setFilter = (column: keyof T, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  return {
    columns,
    data: filteredData,
    filters,
    setFilter,
  };
}
