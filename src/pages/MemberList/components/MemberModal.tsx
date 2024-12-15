import { useState, useEffect, useMemo } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { Field } from "../../../types/Field";
import styled from "styled-components";
import { color, padding } from "../../../styles/theme/theme";
import { Text } from "../../../components/Typography/Text";
import { RecordEntity, UniqueRecord } from "../../../types/Record";
import { CloseIcon } from "../../../components/Icons/CloseIcon";
import { Label } from "../../../components/Label/Label";
import { FieldRenderer } from "./FieldRenderer";
import { IconWrapper } from "../../../components/Icons/IconWrapper";
import { ButtonWithIcons } from "../../../components/Button/ButtonWithIcons";

interface MemberModalProps {
  isOpen: boolean;
  onClose?: () => void;
  fields: Field[];
  record?: UniqueRecord | null;
  onSave?: (updatedRecord: UniqueRecord) => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  record,
  fields,
  onSave,
}) => {
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

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    setCurrentRecord(null);
  };

  const handleSave = () => {
    if (!currentRecord) {
      return;
    }

    if (onSave) {
      onSave(currentRecord);
    }
    handleClose();
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setCurrentRecord((prev) => {
      if (!prev) {
        return new RecordEntity({ [fieldId]: value });
      }

      return {
        ...prev,
        [fieldId]: value,
      };
    });
  };

  const hasChanges = useMemo(() => {
    // 추가 모드
    if (!record) {
      if (!currentRecord) {
        return false;
      }

      return Object.keys(currentRecord).length > 0;
    }

    // 수정 모드
    if (!currentRecord) {
      return false;
    }

    for (const key in currentRecord) {
      if (currentRecord[key] !== record[key]) {
        return true;
      }
    }

    return false;
  }, [currentRecord, record]);

  const hasAllRequiredFields = useMemo(() => {
    return fields.every((field) => {
      if (field.required) {
        return Boolean(currentRecord && currentRecord[field.id]);
      }

      return true;
    });
  }, [fields, currentRecord]);

  const isSaveDisabled = !hasChanges || !hasAllRequiredFields;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <StyledModalHeader>
        <Text fontWeight="fontWeightBold" fontSize="fontSizeLg">
          {record ? "회원 수정" : "회원 추가"}
        </Text>
        <IconWrapper
          size={22}
          padding={3}
          style={{
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          <CloseIcon width={12} height={12} color={color.icon} />
        </IconWrapper>
      </StyledModalHeader>

      <StyledModalBody>
        {fields.map((field) => (
          <StyledField key={field.id}>
            <Label required={field.required}>{field.label}</Label>
            <FieldRenderer
              field={field}
              value={currentRecord ? currentRecord[field.id] : ""}
              onChange={(value) => handleFieldChange(field.id, value)}
            />
          </StyledField>
        ))}
      </StyledModalBody>

      <StyledModalFooter>
        <ButtonWithIcons
          onClick={handleClose}
          variant="secondary"
          style={{ marginRight: "10px" }}
        >
          <Text fontSize="fontSizeLg">취소</Text>
        </ButtonWithIcons>
        <ButtonWithIcons disabled={isSaveDisabled} onClick={handleSave}>
          <Text fontSize="fontSizeLg">저장</Text>
        </ButtonWithIcons>
      </StyledModalFooter>
    </Modal>
  );
};

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${padding.paddingMd};
  border-bottom: 1px solid ${color.border};
`;

const StyledModalBody = styled.div`
  padding: ${padding.paddingMd} ${padding.padding2Xl};
`;

const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${padding.paddingMd} 16px;
  border-top: 1px solid ${color.border};
`;

const StyledField = styled.div`
  margin-bottom: 16px;
`;
