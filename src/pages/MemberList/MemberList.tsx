import React, { useState } from "react";
import { PageLayout } from "../../layouts/PageLayout";
import { Heading } from "../../components/Typography/Heading";
import { ButtonWithIcons } from "../../components/Button/ButtonWithIcons";
import { PlusIcon } from "../../components/Icons/PlusIcon";
import { MemberModal } from "./components/MemberModal";
import { MemberTable } from "./components/MemberTable";
import { initialMembers, memberFields } from "../../constants/member";
import { color, padding } from "../../styles/theme/theme";
import { useMemberRecords } from "./hooks/useMemberRecords";
import { UniqueRecord } from "../../types/Record";
import styled from "styled-components";
import { useModal } from "../../components/Modal/hooks/useModal";
import { Text } from "../../components/Typography/Text";

export const MemberList: React.FC = () => {
  const { records, saveRecord, deleteRecord } =
    useMemberRecords(initialMembers);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const [editingRecord, setEditingRecord] = useState<UniqueRecord | null>(null);

  const handleModalClose = () => {
    closeModal();
    setEditingRecord(null);
  };

  const handleRecordEdit = (record: UniqueRecord) => {
    setEditingRecord(record);
    openModal();
  };

  return (
    <PageLayout>
      <StyledPageHeader>
        <Heading
          as="h1"
          lineHeight="lineHeightRelaxed"
          fontWeight="fontWeightBold"
        >
          회원 목록
        </Heading>
        <ButtonWithIcons
          startContent={
            <PlusIcon width={10} height={10} color={color.bgContainer} />
          }
          onClick={openModal}
        >
          <Text fontSize="fontSizeLg">추가</Text>
        </ButtonWithIcons>
      </StyledPageHeader>

      <MemberTable
        records={records}
        fields={memberFields}
        onRecordEdit={handleRecordEdit}
        onRecordDelete={deleteRecord}
      />

      <MemberModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={saveRecord}
        fields={memberFields}
        record={editingRecord}
      />
    </PageLayout>
  );
};

const StyledPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${padding.paddingSm} ${padding.paddingXl};
  border-bottom: 1px solid ${color.border};
`;
