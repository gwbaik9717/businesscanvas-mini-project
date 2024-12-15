import React from "react";
import { Field, SelectField } from "../../../types/Field";
import { InputText } from "../../../components/Input/InputText";
import { Select } from "../../../components/Select/Select";
import { SelectDatePicker } from "../../../components/Select/SelectDatePicker";
import { SelectTrigger } from "../../../components/Select/SelectTrigger";
import { SelectMenu } from "../../../components/Select/SelectMenu";
import { SelectMenuItem } from "../../../components/Select/SelectMenuItem";
import { InputTextArea } from "../../../components/Input/InputTextArea";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { ButtonWithIcons } from "../../../components/Button/ButtonWithIcons";
import { ChevronDownIcon } from "../../../components/Icons/ChevronDownIcon";
import { CalendarOutlinedIcon } from "../../../components/Icons/CalendarOutlinedIcon";
import { color } from "../../../styles/theme/theme";
import { Text } from "../../../components/Typography/Text";
import { DatePicker } from "../../../components/DatePicker/DatePicker";

interface FieldRendererProps {
  field: Field;
  value?: any;
  onChange?: (value: any) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
}) => {
  const handleChange = (newValue: any) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  if (field.type === "text") {
    return (
      <InputText
        value={value || ""}
        onValueChange={(newValue) => handleChange(newValue)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <InputTextArea
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <Checkbox
        checked={!!value}
        onValueChange={(checked) => handleChange(checked)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        selectionMode="single"
        onSelectionChange={(selectedValue) => handleChange(selectedValue)}
      >
        <SelectTrigger
          as={ButtonWithIcons}
          endContent={<ChevronDownIcon width={10} height={10} />}
        >
          {value || "Select an option"}
        </SelectTrigger>
        <SelectMenu>
          {(field as SelectField).options.map((option) => (
            <SelectMenuItem key={option} value={option}>
              {option}
            </SelectMenuItem>
          ))}
        </SelectMenu>
      </Select>
    );
  }

  if (field.type === "date") {
    return (
      <DatePicker
        value={value}
        onChange={(selectedDate) => handleChange(selectedDate)}
      />
    );
  }

  return null;
};
