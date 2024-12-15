import React from "react";
import { Select } from "../Select/Select";
import { SelectTrigger } from "../Select/SelectTrigger";
import { SelectMenu } from "../Select/SelectMenu";
import { SelectMenuItem } from "../Select/SelectMenuItem";
import { ButtonWithIcons } from "../Button/ButtonWithIcons";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { color, transition } from "../../styles/theme/theme";
import styled from "styled-components";
import { Text } from "../Typography/Text";

interface DefaultSelectProps {
  value?: string;
  options: string[];
  placeholder?: string;
  width?: string | number;
  onChange: (selectedValue: string) => void;
}

export const DefaultSelect: React.FC<DefaultSelectProps> = ({
  value,
  options,
  placeholder = "Select an option",
  width,
  onChange,
}) => {
  return (
    <Select selectionMode="single" onSelectionChange={onChange}>
      <SelectTrigger as={StyledTrigger} width={width}>
        <Text fontSize="fontSizeLg">{value || placeholder}</Text>
      </SelectTrigger>

      <SelectMenu>
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
