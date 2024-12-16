import { useState, useMemo } from "react";
import { UniqueRecord } from "../../../types/Record";
import { FieldType } from "../../../types/Field";

export interface TableColumn<T extends UniqueRecord> {
  id: string;
  label: string | null;
  accessor: keyof T;
  type?: FieldType;
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
  const [filters, setFilters] = useState<Partial<Record<keyof T, any[]>>>({});

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filters).every(([key, values]) => {
        if (!values || values.length === 0) return true;
        const cellValue = row[key as keyof T];
        return values.includes(cellValue);
      })
    );
  }, [data, filters]);

  const setFilter = (column: keyof T, values: any[]) => {
    setFilters((prev) => ({
      ...prev,
      [column]: values.length > 0 ? values : undefined,
    }));
  };

  return {
    columns,
    data: filteredData,
    filters,
    setFilter,
  };
}
