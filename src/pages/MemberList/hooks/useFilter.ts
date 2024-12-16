import { useCallback } from "react";
import { RegisterOptionType } from "../../../components/Select/Select";
import { UniqueRecord } from "../../../types/Record";

export const useFilter = (records: UniqueRecord[]) => {
  const getFilterOptions = useCallback(
    (accessor: keyof UniqueRecord): RegisterOptionType[] => {
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
    },
    [records]
  );

  return { getFilterOptions };
};
