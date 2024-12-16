import { useMemo } from "react";
import { Field } from "../../../types/Field";
import { UniqueRecord } from "../../../types/Record";

interface UseMemberRecordValidationProps {
  currentRecord: UniqueRecord | null;
  record?: UniqueRecord | null;
  fields: Field[];
}

export const useMemberRecordValidation = ({
  currentRecord,
  record,
  fields,
}: UseMemberRecordValidationProps) => {
  const hasChanges = useMemo(() => {
    if (!record) {
      return currentRecord && Object.keys(currentRecord).length > 0;
    }

    if (!currentRecord) return false;

    return Object.keys(currentRecord).some(
      (key) => currentRecord[key] !== record[key]
    );
  }, [currentRecord, record]);

  const hasAllRequiredFields = useMemo(() => {
    return fields.every((field) => {
      return !field.required || Boolean(currentRecord?.[field.id]);
    });
  }, [fields, currentRecord]);

  return { hasChanges, hasAllRequiredFields };
};
