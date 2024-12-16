import React from "react";
import { Select, SelectTrigger, SelectMenu, SelectMenuItem } from "../Select";
import { ButtonWithIcons } from "../Button/components/ButtonWithIcons";
import { ChevronDownIcon } from "../Icons/components/ChevronDownIcon";
import { color, transition } from "../../styles/theme";
import styled from "styled-components";
import { Text } from "../Typography/components/Text";

interface DefaultSelectProps {
  value?: string;
  options: string[];
  placeholder?: string;
  onChange: (selectedValue: string) => void;
}

export const DefaultSelect: React.FC<DefaultSelectProps> = ({
  value,
  options,
  placeholder = "Select an option",
  onChange,
}) => {
  return (
    <Select selectionMode="single" onSelectionChange={onChange}>
      <SelectTrigger as={StyledTrigger}>
        <Text fontSize="fontSizeLg">{value || placeholder}</Text>
      </SelectTrigger>

      <SelectMenu
        style={{
          width: "198px",
        }}
      >
        {options.map((option) => (
          <SelectMenuItem
            key={option}
            value={option}
            selected={value === option}
          >
            <Text fontSize="fontSizeLg">{option}</Text>
          </SelectMenuItem>
        ))}
      </SelectMenu>
    </Select>
  );
};

const StyledTrigger = styled(ButtonWithIcons).attrs({
  endContent: <ChevronDownIcon width={10} height={10} color={color.text} />,
})<{ width?: string | number }>`
  background-color: ${color.bgContainer};
  border: 1px solid ${color.border};
  color: ${color.text};
  width: ${(props) => props.width};
  justify-content: space-between;
  transition: ${transition.transition};

  &:hover {
    background-color: ${color.bgContainer};
    border-color: ${color.primary};

    svg {
      color: ${color.primary};
      fill: ${color.primary};
    }
  }
`;
