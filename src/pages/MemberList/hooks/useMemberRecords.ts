import { UniqueRecord } from "../../../types/Record";
import { useStorage } from "../../../hooks/useStorage";
import { STORAGE_KEY_MEMBER_RECORDS } from "../../../constants/storage";

export const useMemberRecords = (initialData: UniqueRecord[]) => {
  const [records, setRecords] = useStorage(
    STORAGE_KEY_MEMBER_RECORDS,
    initialData
  );

  const saveRecord = (record: UniqueRecord) => {
    setRecords((prev) => {
      const existingIndex = prev.findIndex((r) => r.id === record.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = record;
        return updated;
      }
      return [...prev, record];
    });
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return { records, saveRecord, deleteRecord, setRecords };
};
