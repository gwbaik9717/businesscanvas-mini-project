import { useState, useMemo } from "react";

export interface TableColumn<T> {
  label: string;
  accessor: keyof T;
  filterable?: boolean;
}

export interface UseTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

export function useTable<T>({ data, columns }: UseTableProps<T>) {
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
