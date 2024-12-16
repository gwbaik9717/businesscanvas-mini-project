import { Modal } from "../../../components/Modal/Modal";
import { Field } from "../../../types/Field";
import styled from "styled-components";
import { color, padding } from "../../../styles/theme";
import { Text } from "../../../components/Typography/components/Text";
import { RecordEntity, UniqueRecord } from "../../../types/Record";
import { CloseIcon, IconWrapper } from "../../../components/Icons";
import { Label } from "../../../components/Label/Label";
import { FieldRenderer } from "./FieldRenderer";
import { ButtonWithIcons } from "../../../components/Button/components/ButtonWithIcons";
import { useMemberRecordValidation } from "../hooks/useMemberRecordValidation";
import { useMemberRecord } from "../hooks/useMemberRcord";

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
  const { currentRecord, setCurrentRecord } = useMemberRecord({ record });
  const { hasChanges, hasAllRequiredFields } = useMemberRecordValidation({
    currentRecord,
    record,
    fields,
  });

  const isSaveDisabled = !hasChanges || !hasAllRequiredFields;

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
