import React from "react";
import { Select, SelectTrigger, SelectDatePicker } from "../Select";
import { CalendarOutlinedIcon } from "../Icons";
import { ButtonWithIcons } from "../Button";
import { Text } from "../Typography";
import { color, transition } from "../../styles/theme";
import styled from "styled-components";

interface DatePickerProps {
  value?: string;
  placeholder?: string;
  onChange?: (selectedDate: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  placeholder = "Select date",
  onChange,
}) => {
  const handleDateChange = (newDate: string) => {
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <Select selectionMode="single" onSelectionChange={handleDateChange}>
      <SelectTrigger as={StyledTrigger}>
        <Text fontSize="fontSizeLg">{value || placeholder}</Text>
      </SelectTrigger>

      <SelectDatePicker value={value} />
    </Select>
  );
};

const StyledTrigger = styled(ButtonWithIcons).attrs({
  endContent: <CalendarOutlinedIcon width={16} height={16} />,
})`
  background-color: ${color.bgContainer};
  border: 1px solid ${color.border};
  color: ${color.text};
  width: 162px;
  justify-content: space-between;
  transition: ${transition.transition};

  &:hover {
    background-color: ${color.bgContainer};
    border-color: ${color.primary};
  }

  &:focus {
    background-color: ${color.bgContainer};
    border-color: ${color.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    outline: none;
  }
`;
