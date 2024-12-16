import { useState, useEffect } from "react";
import { UniqueRecord } from "../../../types/Record";

interface UseMemberRecordProps {
  record?: UniqueRecord | null;
}

export const useMemberRecord = ({ record }: UseMemberRecordProps) => {
  const [currentRecord, setCurrentRecord] = useState<UniqueRecord | null>(
    record || null
  );

  useEffect(() => {
    if (record) {
      setCurrentRecord(record);
    } else {
      setCurrentRecord(null);
    }
  }, [record]);

  return { currentRecord, setCurrentRecord };
};
