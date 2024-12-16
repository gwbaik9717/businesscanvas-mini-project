import React from "react";
import { RegisterOptionType, Select } from "../Select/Select";
import { SelectTrigger } from "../Select/SelectTrigger";
import { SelectMenu } from "../Select/SelectMenu";
import { SelectMenuItem } from "../Select/SelectMenuItem";
import { ButtonIconOnly } from "../Button/ButtonIconOnly";
import { KebabIcon } from "../Icons/KebabIcon";
import { color, padding, transition } from "../../styles/theme/theme";
import styled from "styled-components";
import { Divider } from "../Divider/Divider";
import { Text } from "../Typography/Text";

interface RecordEditProps {
  options: RegisterOptionType[];
  onSelectionChange?: (values: any) => void;
}

export const RecordEdit: React.FC<RecordEditProps> = ({
  options,
  onSelectionChange,
}) => {
  return (
    <Select
      selectionMode="single"
      onSelectionChange={(selectedValue) => {
        if (onSelectionChange) {
          onSelectionChange(selectedValue);
        }
      }}
    >
      <SelectTrigger
        as={ButtonIconOnly}
        style={{
          padding: padding.paddingSm,
        }}
      >
        <KebabIcon width={16} height={16} color={color.text} />
      </SelectTrigger>

      <SelectMenu
        variant="right"
        style={{
          width: "150px",
        }}
      >
        {options.map((option, index) => (
          <React.Fragment key={option.value}>
            <StyledMenuItem value={option.value}>
              {typeof option.label === "string" ? (
                <Text fontSize="fontSizeLg">{option.label}</Text>
              ) : (
                option.label
              )}
            </StyledMenuItem>
            {index < options.length - 1 && <Divider padding="4px 0" />}
          </React.Fragment>
        ))}
      </SelectMenu>
    </Select>
  );
};

const StyledMenuItem = styled(SelectMenuItem)`
  padding: ${padding.paddingSm};
  cursor: pointer;
  transition: ${transition.transition};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${color.bgContainerHover};
  }
`;
