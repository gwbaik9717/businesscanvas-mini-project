import { useState, useEffect } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { Field } from "../../../types/Field";
import styled from "styled-components";
import { color, padding } from "../../../styles/theme/theme";
import { Text } from "../../../components/Typography/Text";
import { RecordEntity, UniqueRecord } from "../../../types/Record";
import { ButtonIconOnly } from "../../../components/Button/ButtonIconOnly";
import { CloseIcon } from "../../../components/Icons/CloseIcon";
import { Label } from "../../../components/Label/Label";
import { FieldRenderer } from "./FieldRenderer";
import { IconWrapper } from "../../../components/Icons/IconWrapper";

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
        <button onClick={handleClose} style={{ marginRight: "10px" }}>
          취소
        </button>
        <button onClick={handleSave}>저장</button>
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
